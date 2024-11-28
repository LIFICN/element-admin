import { nextTick, onBeforeUnmount, onMounted, ref, watch, computed } from 'vue'

function debounceRAF(func) {
  let id = null
  return function () {
    id && cancelAnimationFrame(id)
    requestAnimationFrame(() => {
      func?.apply(this, arguments)
      id = null
    })
  }
}

function debounce(func, wait = 100) {
  let timer = null
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func?.apply(this, arguments)
      timer = null
    }, wait)
  }
}

function findDifferentKeys(array1, array2) {
  if (!array1?.length || !array2?.length) return []
  const set1 = new Set(array1)
  const set2 = new Set(array2)
  // 找出在 array1 中但不在 array2 中的元素
  const uniqueToArray1 = [...set1].filter((x) => !set2.has(x))
  // 找出在 array2 中但不在 array1 中的元素
  const uniqueToArray2 = [...set2].filter((x) => !set1.has(x))
  // 合并结果
  return [...uniqueToArray1, ...uniqueToArray2]
}

export default function useVirtualList(
  config = {
    scrollContainer: '',
    contentContainer: '',
    itemContainer: '',
    dataSource: [],
    size: 10,
    bufferSize: 10,
    keyField: '',
    itemHeight: 10,
  }
) {
  const {
    scrollContainer,
    contentContainer,
    itemContainer,
    size = 10,
    bufferSize = 4,
    keyField = '',
    itemHeight = 10,
  } = config || {}

  if (!scrollContainer || !contentContainer || !itemContainer || !keyField || !itemHeight)
    throw new Error(
      'The parameters `scrollContainer`,`contentContainer`,`itemContainer`,`keyField`,`itemHeight` cannot be null'
    )

  const sourceList = ref([])
  const sliceData = ref([])
  let scrollContainerEl = null
  let contentContainerEl = null
  let phantomDivEl = null
  let startIndex = 0 //实际滚动定位起始索引
  const renderedHeightMap = new Map() //已渲染缓存实际高度
  let bufferStartIndex = -1 //起始缓存索引
  let resizeObserver = null
  let itemResized = false //容器，item尺寸是否改变
  let keyIndexObj = {} //key-index对照
  let itemTopObj = {} ////已渲染缓存实际top
  let startTopKey = null //记录上一次滚动开始item key

  const itemKeyArr = computed(() => sourceList.value.map((x) => x[keyField]))

  watch(
    () => config.dataSource?.value?.slice(),
    (newVal, oldVal) => {
      sourceList.value = newVal || []
      itemResized = true
      startTopKey = null

      if (!sourceList.value?.length) {
        renderedHeightMap.clear()
        itemTopObj = {}
        keyIndexObj = {}
        startIndex = 0
        bufferStartIndex = -1
        nextTick(() => {
          if (!phantomDivEl || !contentContainerEl) return
          phantomDivEl.style.height = `0px`
          contentContainerEl.style.transform = `translateY(0px)`
        })

        updateData()
        return
      }

      if (newVal.some((el) => !el[keyField])) throw new Error('no keyField on items')
      //对比出不存在的key，移除已缓存高度
      const diffKeys = findDifferentKeys(
        newVal.map((el) => el[keyField]),
        oldVal?.map((el) => el[keyField])
      )
      if (diffKeys.length) {
        diffKeys.forEach((key) => {
          if (renderedHeightMap.get(key)) renderedHeightMap.delete(key)
        })
      }

      keyIndexObj = {}
      newVal?.forEach((el, index) => (keyIndexObj[el[keyField]] = index))
      updateData()
    },
    { deep: true, immediate: true }
  )

  onMounted(() => {
    scrollContainerEl = document.querySelector(scrollContainer)
    contentContainerEl = document.querySelector(contentContainer)
    if (!scrollContainerEl || !contentContainerEl) return

    scrollContainerEl.addEventListener('scroll', handleScroll)
    phantomDivEl = document.createElement('div')
    phantomDivEl.style.height = `${sourceList.value.length * itemHeight || 0}px`
    scrollContainerEl.appendChild(phantomDivEl)
    scrollContainerEl.style.position = 'relative'
    contentContainerEl.style.position = 'absolute'
    contentContainerEl.style.top = 0
    contentContainerEl.style.left = 0

    //容器尺寸变化或item高度变化需要重新计算高度, 更新所有已渲染item top
    resizeObserver = new ResizeObserver(
      debounce(async function () {
        await updateItemSize()
      }, 120)
    )

    resizeObserver.observe(contentContainerEl)
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    scrollContainerEl?.remove('scroll', handleScroll)
  })

  //获取当前已渲染的item dom
  const getCurrentRenderedItem = () => Array.from(contentContainerEl?.querySelectorAll(itemContainer) || [])
  const getItemHeight = (itemKey) => renderedHeightMap.get(itemKey) || itemHeight || 0

  const handleScroll = debounceRAF(async function (e) {
    const scrollTop = e.target.scrollTop
    //如果scrolltop在当前item高度内滚动，则跳过计算
    const preStartTop = itemTopObj[startTopKey] || 0
    if (scrollTop > preStartTop && scrollTop <= preStartTop + getItemHeight(startTopKey)) return

    //根据已渲染的item key，双指针查找匹配符合scrolltop的key，计算出符合的index
    const topKey = doubleSearch(scrollTop)
    if (!topKey || startTopKey == topKey) return
    startTopKey = topKey
    startIndex = keyIndexObj[topKey]

    //实时计算数据，更新高度，top
    updateData()
    await updateItemSize()
    transformToStart()
  })

  function updateData() {
    let nBufSize = bufferSize || 1
    //计算起始索引
    bufferStartIndex = startIndex < nBufSize ? 0 : startIndex - nBufSize >= 0 ? startIndex - nBufSize : startIndex
    //计算结束索引
    let endSum = startIndex + size + nBufSize
    let end = endSum >= sourceList.value.length ? sourceList.value.length : endSum
    sliceData.value = sourceList.value.slice(bufferStartIndex, end)
  }

  async function updateItemSize() {
    //如果以更新到最后一项item数据，不再遍历，但是数据，高度变化，重新计算
    const allLength = sourceList.value.length
    if (allLength <= 0 || (!itemResized && renderedHeightMap.length == allLength)) return
    itemResized = false

    await nextTick()
    const els = getCurrentRenderedItem()
    //动态缓存列表项最新高度, top
    for (let index = 0; index < els.length; index++) {
      const el = els[index]
      const key = sliceData.value[index][keyField]
      const ofsh = el.offsetHeight
      if (renderedHeightMap.get(key) != ofsh) renderedHeightMap.set(key, ofsh)
    }

    calcItemTop()
    updateHeight()
  }

  const updateHeight = () => {
    //更新总高度
    const endKey = itemKeyArr.value[itemKeyArr.value.length - 1]
    if (!endKey) return
    phantomDivEl.style.height = `${itemTopObj[endKey] + getItemHeight(endKey)}px`
  }

  function transformToStart() {
    //计算开始部分缓冲区高度
    let bufferStartHeight = 0
    if (bufferStartIndex >= 0 && bufferStartIndex != startIndex) {
      sourceList.value.slice(bufferStartIndex, startIndex).forEach((el) => {
        bufferStartHeight += renderedHeightMap.get(el[keyField])
      })
    }

    //动态定位到start位置
    contentContainerEl.style.transform = `translateY(${itemTopObj[startTopKey] - bufferStartHeight}px)`
  }

  //计算所有已渲染的item top值
  const calcItemTop = debounce(function () {
    if (!sourceList.value?.length) return
    //获取最新渲染列表，开始item的top，向下批量更新
    let sumOffsetHeight = itemTopObj[sourceList.value[bufferStartIndex][keyField]] || 0
    for (let index = bufferStartIndex; index < sourceList.value.length; index++) {
      const el = sourceList.value[index]
      const itemKey = el[keyField]
      itemTopObj[itemKey] = sumOffsetHeight
      const offsetHeight = getItemHeight(itemKey)
      sumOffsetHeight += offsetHeight
    }

    //更新时间不固定，会导致高度，滚动错位，需要再次计算
    transformToStart()
    updateHeight()
  }, 60)

  //双指针查找算法，配合检索虚拟列表scrolltop魔改，非原版通用
  function doubleSearch(scrollTop) {
    const array = itemKeyArr.value
    let left = 0
    let right = array.length - 1
    while (true) {
      if (left > right) break
      if (itemTopObj[array[left]] >= scrollTop) return array[left]
      const rightValue = itemTopObj[array[right]] - scrollTop
      if (rightValue >= 0 && rightValue <= getItemHeight(array[right])) return array[right]
      left += 1
      right -= 1
    }

    return undefined
  }

  function scrollTo(index) {
    const itemKey = sourceList.value[index] && sourceList.value[index][keyField]
    if (!itemKey || itemTopObj[itemKey] < 0 || !scrollContainerEl) return
    scrollContainerEl.scrollTop = itemTopObj[index]
  }

  return { sliceData, scrollTo }
}
