// const arr: any[] = [
//     { id: 1, name: '部门1', pid: 0 },
//     { id: 2, name: '部门2', pid: 1 },
//     { id: 3, name: '部门3', pid: 1 },
//     { id: 4, name: '部门4', pid: 3 },
//     { id: 5, name: '部门5', pid: 4 },
// ]
// console.log(toTree(arr, 'id', 'pid'))
// console.log(toTree2(arr, 'id', 'pid'))

export function toTree(arr: any[], idKey: string = 'id', parentKey: string = 'pid'): any[] {
  if (arr.length == 0 || !idKey || !parentKey) return []

  const arrMap: any = {}
  const res: any[] = []

  arr.forEach((item) => (arrMap[item[idKey]] = { ...item, chidren: [] })) //create template
  arr.forEach((item) => {
    const id = item[idKey]
    const pid = item[parentKey]

    if (arrMap[pid]) arrMap[pid].chidren.push(arrMap[id]) //find children
    if (!pid) res.push(arrMap[id]) //top item
  })

  return res
}

export function toTree2(arr: any[], idKey: string = 'id', parentKey: string = 'pid'): any[] {
  if (arr.length == 0 || !idKey || !parentKey) return []

  const res: any[] = []
  arr.forEach((item) => {
    item['chidren'] = arr.filter((el) => item[idKey] == el[parentKey]) //find children
    if (!item[parentKey]) res.push(item) //top item
  })

  return res
}
