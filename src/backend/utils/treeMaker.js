// 每次都完整遍历源数据比对,耗时长
// 后面再考虑算法优化问题
export function getDFSTree (data, pid) {
  let treelist = []
  data.forEach((row, i) => {
    if (row.pid === pid) {
      let tree = row
      // 过滤掉当前row,递归时可以不用再遍历该row
      let newData = data.slice(0, i).concat(data.slice(i + 1))
      let children = newData.length > 0 ? getDFSTree(newData, row.id) : []
      if (children.length > 0) {
        tree.children = children
      }
      treelist.push(tree)
    }
  })
  return treelist
}

// 通过id获取其所有父节点,并以数组形式返回
export function getParent (data, pid, res = []) {
  const parent = data.filter(v => v.id === pid)[0]
  res.unshift(parent.id)
  // 还存在父id
  if (parent.pid !== 0) {
    return getParent(data, parent.pid, res)
  } else {
    return res
  }
}
