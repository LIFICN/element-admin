import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

function debounceRAF(func, isAsync) {
  let flag = false
  return function () {
    if (flag) return
    flag = true
    requestAnimationFrame(async () => {
      isAsync ? await func?.apply(this, arguments) : func?.apply(this, arguments)
      flag = false
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
  }
) {
  const { scrollContainer, contentContainer, itemContainer, size = 10, bufferSize = 10, keyField = '' } = config || {}

  if (!scrollContainer || !contentContainer || !itemContainer || !keyField)
    throw new Error('The parameters `scrollContainer`,`contentContainer`,`itemContainer`,`keyField` cannot be null')

  const sourceList = ref([])
  const sliceData = ref([])
  let scrollContainerEl = null
  let contentContainerEl = null
  let phantomDivEl = null
  let startIndex = 0 //实际滚动定位起始索引
  let renderedHeightObj = {} //已渲染缓存实际高度
  let bufferStartIndex = -1 //起始缓存索引
  let resizeObserver = null
  let isResizeHeight = false //是否需要重新计算总高度
  let keyIndexObj = {} //key-index对照
  let renderedTopObj = {} ////已渲染缓存实际top

  watch(
    () => config.dataSource?.value?.slice(),
    (newVal, oldVal) => {
      sourceList.value = newVal || []
      isResizeHeight = true

      if (!sourceList.value?.length) {
        renderedHeightObj = {}
        renderedTopObj = {}
        keyIndexObj = {}
        startIndex = 0
        bufferStartIndex = -1
        nextTick(() => {
          if (!phantomDivEl || !contentContainerEl) return
          phantomDivEl.style.height = 0
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
          if (renderedHeightObj[key]) delete renderedHeightObj[key]
        })
      }

      keyIndexObj = {}
      newVal?.forEach((el, index) => {
        keyIndexObj[el[keyField]] = index
      })

      updateData()
      //如果有添加，删除数据，更新所有已渲染的item top
      nextTick(() => calcItemTop())
    },
    { deep: true, immediate: true }
  )

  onMounted(() => {
    scrollContainerEl = document.querySelector(scrollContainer)
    contentContainerEl = document.querySelector(contentContainer)
    if (!scrollContainerEl || !contentContainerEl) return

    scrollContainerEl.addEventListener('scroll', handleScroll)
    phantomDivEl = document.createElement('div')
    scrollContainerEl.appendChild(phantomDivEl)
    scrollContainerEl.style.position = 'relative'
    contentContainerEl.style.position = 'absolute'
    contentContainerEl.style.top = 0
    contentContainerEl.style.left = 0

    //容器尺寸变化或item高度变化需要重新计算高度, 更新所有已渲染item top
    resizeObserver = new ResizeObserver(
      debounce(async function () {
        isResizeHeight = true
        await updateScrollHeight()
        calcItemTop()
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

  async function updateScrollHeight() {
    //如果以更新到最后一项item数据，不再遍历，但是数据，高度变化，重新计算
    const endItem = sourceList.value[sourceList.value.length - 1] || {}
    if (!isResizeHeight && renderedHeightObj[endItem[keyField]] > 0) return
    isResizeHeight = false

    await nextTick()
    const els = getCurrentRenderedItem()

    //动态缓存列表项最新高度, top
    for (let index = 0; index < els.length; index++) {
      const el = els[index]
      const key = sliceData.value[index][keyField]
      const ofsh = el.offsetHeight
      if (renderedHeightObj[key] != ofsh) renderedHeightObj[key] = ofsh

      //计算top值
      const pre = sourceList.value[keyIndexObj[key] - 1]
      if (pre) {
        const preKey = pre[keyField]
        if (renderedTopObj[preKey] > 0) {
          renderedTopObj[key] = renderedTopObj[preKey] + renderedHeightObj[preKey]
        }
      }
    }

    //更新总高度
    phantomDivEl.style.height = `${Object.values(renderedHeightObj).reduce((r, c) => r + c, 0)}px`
  }

  function updateData() {
    //计算起始索引
    bufferStartIndex = startIndex < bufferSize ? 0 : startIndex - bufferSize >= 0 ? startIndex - bufferSize : startIndex
    //计算结束索引
    let endSum = startIndex + size + bufferSize
    let end = endSum >= sourceList.value.length ? sourceList.value.length : endSum
    sliceData.value = sourceList.value.slice(bufferStartIndex, end)
  }

  const handleScroll = debounceRAF(async function (e) {
    const scrollTop = e.target.scrollTop
    //根据已渲染的item key，双指针查找匹配符合scrolltop的key，计算出符合的index
    const topKeys = Object.keys(renderedTopObj)
    const index = doubleSearch(
      topKeys,
      (x) => renderedTopObj[x] >= scrollTop,
      (x) => renderedTopObj[x] < scrollTop
    )

    if (index < 0) return
    const tKey = topKeys[index]
    startIndex = keyIndexObj[tKey]
    let sumOffsetHeight = renderedTopObj[tKey]

    //实时计算数据，更新高度，top
    updateData()
    await updateScrollHeight()

    //计算开始部分缓冲区高度
    let bufferStartHeight = 0
    if (bufferStartIndex >= 0 && bufferStartIndex != startIndex) {
      sourceList.value.slice(bufferStartIndex, startIndex).forEach((el) => {
        bufferStartHeight += renderedHeightObj[el[keyField]]
      })
    }

    //动态定位到start位置
    contentContainerEl.style.transform = `translateY(${sumOffsetHeight - bufferStartHeight}px)`
  }, true)

  //计算所有已渲染的item top值
  function calcItemTop() {
    let sumOffsetHeight = 0
    for (let index = 0; index < sourceList.value.length; index++) {
      const itemKey = sourceList.value[index][keyField]
      if (!renderedHeightObj[itemKey]) break

      renderedTopObj[itemKey] = sumOffsetHeight
      const offsetHeight = renderedHeightObj[itemKey] || 0
      sumOffsetHeight += offsetHeight
    }
  }

  //双指针查找算法，配合检索虚拟列表scrolltop魔改，非原版通用
  function doubleSearch(array, matchFnLeft, matchFnRight) {
    let left = 0
    let right = array.length - 1

    while (true) {
      if (left > right) break
      if (matchFnLeft(array[left])) return left
      if (matchFnRight(array[right])) return right + 1
      left += 1
      right -= 1
    }

    return -1
  }

  return { sliceData }
}
