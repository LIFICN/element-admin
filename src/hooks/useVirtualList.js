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
  let renderedItemsCache = {} //已渲染缓存列表
  let realHeight = 0 //总高度
  let bufferStartIndex = -1 //起始缓存索引
  let resizeObserver = null
  let isResizeHeight = false //是否需要重新计算总高度

  watch(
    () => config.dataSource?.value?.slice(),
    (newVal, oldVal) => {
      if (newVal.some((el) => !el[keyField])) throw new Error('no keyField on items')
      //对比出不存在的key，移除已缓存高度
      const diffKeys = findDifferentKeys(
        newVal.map((el) => el[keyField]),
        oldVal?.map((el) => el[keyField])
      )
      if (diffKeys.length) {
        diffKeys.forEach((key) => {
          if (renderedItemsCache[key]) delete renderedItemsCache[key]
        })
      }

      sourceList.value = newVal || []
      isResizeHeight = true
      if (!sourceList.value?.length) {
        renderedItemsCache = {}
        startIndex = 0
        bufferStartIndex = -1
        realHeight = 0
        nextTick(() => {
          if (!phantomDivEl || !contentContainerEl) return
          phantomDivEl.style.height = 0
          contentContainerEl.style.transform = `translateY(0px)`
        })
      }

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
    scrollContainerEl.appendChild(phantomDivEl)
    scrollContainerEl.style.position = 'relative'
    contentContainerEl.style.position = 'absolute'
    contentContainerEl.style.top = 0
    contentContainerEl.style.left = 0

    //容器尺寸变化重新计算高度
    resizeObserver = new ResizeObserver(
      debounce(function () {
        isResizeHeight = true
        updateScrollHeight()
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
    if (!isResizeHeight && renderedItemsCache[endItem[keyField]] > 0) return
    isResizeHeight = false

    await nextTick()
    const els = getCurrentRenderedItem()

    //动态缓存列表项最新高度
    for (let index = 0; index < els.length; index++) {
      const el = els[index]
      const key = sliceData.value[index][keyField]
      const ofsh = el.offsetHeight
      if (renderedItemsCache[key] != ofsh) renderedItemsCache[key] = ofsh
    }

    //更新总高度
    const sum = Object.values(renderedItemsCache).reduce((r, c) => r + c, 0)
    if (realHeight == sum) return
    realHeight = sum
    phantomDivEl.style.height = `${sum}px`
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
    let sumOffsetHeight = 0

    for (let index = 0; index < sourceList.value.length; index++) {
      const item = sourceList.value[index]
      const itemKey = item[keyField]
      const offsetHeight = renderedItemsCache[itemKey]
      sumOffsetHeight += offsetHeight

      //判断滚动到哪一项列表元素
      if (sumOffsetHeight >= scrollTop) {
        startIndex = index
        updateData()
        await updateScrollHeight()
        let selftHeight = renderedItemsCache[itemKey] || 0

        //计算开始部分缓冲区高度
        let bufferStartHeight = 0
        if (bufferStartIndex >= 0 && bufferStartIndex != startIndex) {
          sourceList.value.slice(bufferStartIndex, startIndex).forEach((el) => {
            bufferStartHeight += renderedItemsCache[el[keyField]]
          })
        }

        //动态定位到start位置
        contentContainerEl.style.transform = `translateY(${sumOffsetHeight - selftHeight - bufferStartHeight}px)`
        break
      }
    }
  }, true)

  return { sliceData }
}
