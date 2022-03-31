// const arr = [
//     { id: 1, name: '部门1', pid: 0 },
//     { id: 2, name: '部门2', pid: 1 },
//     { id: 3, name: '部门3', pid: 1 },
//     { id: 4, name: '部门4', pid: 3 },
//     { id: 5, name: '部门5', pid: 4 },
//   ]
//   console.log(toTree(arr, 'id', 'pid', [0]))
//   console.log(toTree2(arr, 'id', 'pid', [0]))

const isArray = (arr) => Array.isArray(arr)

export function toTree(arr = [], idKey = 'id', parentKey = 'pid', parentIds = []) {
  if (!isArray(arr) || !idKey || !parentKey || !isArray(parentIds)) return []

  const arrMap = {}

  arr.forEach((item) => {
    const id = item[idKey]
    const pid = item[parentKey]

    if (!arrMap[id]) arrMap[id] = { ...item, chidren: [] }

    if (arrMap[pid]) arrMap[pid].chidren.push(arrMap[id])
  })

  return Object.values(arrMap).filter((el) => parentIds.includes(el[parentKey]))
}

export function toTree2(arr = [], idKey = 'id', parentKey = 'pid', parentIds = []) {
  if (!isArray(arr) || !idKey || !parentKey || !isArray(parentIds)) return []

  arr.forEach((item) => {
    item['chidren'] = arr.filter((el) => item[idKey] == el[parentKey])
  })

  return arr.filter((el) => parentIds.includes(el[parentKey]))
}
