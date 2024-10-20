import { nextTick, onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue'

export function useInfiniteScroll(containerSelctor, loadMore, offset = 10) {
  const isLoading = ref(false)
  let container = null
  let isLock = false
  let oldScrollTop = 0

  onMounted(() => {
    if (typeof loadMore != 'function') throw new Error('loadMore is not function')
    container = document.querySelector(containerSelctor)
    container?.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    container?.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    if (!container || isLoading.value) return
    const scrollTop = container.scrollTop
    const clientHeight = container.clientHeight
    const scrollHeight = container.scrollHeight

    //向上滚动不触发
    const oldScrollTopVal = oldScrollTop
    oldScrollTop = scrollTop
    if (oldScrollTopVal > scrollTop) return

    if (scrollHeight <= clientHeight + scrollTop + offset) {
      //动态创建加载动画或者其他底部元素，触底校验会触发两次，需要跳过
      if (isLock) {
        isLock = false
        return
      }

      isLoading.value = true
      isLock = true
      loadMore &&
        loadMore()?.finally(() => {
          isLoading.value = false
        })
    }
  }

  return { isLoading: readonly(isLoading) }
}

export function useVirtualList(
  config = {
    scrollContainer: '',
    contentContainer: '',
    dataSource: [],
    size: 10,
    bufferSize: 10,
    keyField: '',
  }
) {
  if (typeof config != 'object') throw new Error('config is object')
  const { scrollContainer, contentContainer, size = 10, bufferSize = 10, keyField = '' } = config
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
      if (!sourceList.value?.length) {
        renderedItemsCache = {}
        startIndex = 0
        bufferStartIndex = -1
        realHeight = 0
        nextTick(() => (phantomDivEl.style.height = 0))
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
      debounce(function (e) {
        const { children } = e[0].target
        updateScrollHeight(children)
      }, 100)
    )

    resizeObserver.observe(contentContainerEl)
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    scrollContainerEl?.remove('scroll', handleScroll)
  })

  async function updateScrollHeight(children) {
    await nextTick()
    const els = Array.from(children || document.querySelector(contentContainer)?.children)

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
    let start = (bufferStartIndex =
      startIndex < bufferSize ? 0 : startIndex - bufferSize >= 0 ? startIndex - bufferSize : startIndex)
    //计算结束索引
    let endSum = startIndex + size + bufferSize
    let end = endSum >= sourceList.value.length ? sourceList.value.length : endSum
    sliceData.value = sourceList.value.slice(start, end)
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
  })

  function debounceRAF(func) {
    let flag = null
    return function () {
      if (flag) return
      flag = true
      requestAnimationFrame(() => {
        func?.apply(this, arguments)
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

  return { sliceData }
}
