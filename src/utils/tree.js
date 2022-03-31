// const arr = [
//     { id: 1, name: '部门1', pid: 0 },
//     { id: 2, name: '部门2', pid: 1 },
//     { id: 3, name: '部门3', pid: 1 },
//     { id: 4, name: '部门4', pid: 3 },
//     { id: 5, name: '部门5', pid: 4 },
//   ]
//   console.log(toTree(arr, 'id', 'pid'))
//   console.log(toTree2(arr, 'id', 'pid'))

const isArray = (arr) => Array.isArray(arr)

export function toTree(arr = [], idKey = 'id', parentKey = 'pid') {
  if (!isArray(arr) || !idKey || !parentKey) return []

  const arrMap = {}
  const res = []

  arr.forEach((item) => {
    const id = item[idKey]
    const pid = item[parentKey]

    if (!arrMap[id]) arrMap[id] = { ...item, chidren: [] }
    if (arrMap[pid]) arrMap[pid].chidren.push(arrMap[id])
    if (!pid) res.push(arrMap[id])
  })

  return res
}

export function toTree2(arr = [], idKey = 'id', parentKey = 'pid') {
  if (!isArray(arr) || !idKey || !parentKey) return []

  const res = []
  arr.forEach((item) => {
    item['chidren'] = arr.filter((el) => item[idKey] == el[parentKey])
    if (!item[parentKey]) res.push(item)
  })

  return res
}
