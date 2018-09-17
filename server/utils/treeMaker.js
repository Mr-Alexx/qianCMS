// 每次都完整遍历源数据比对,耗时长
// 后面再考虑算法优化问题
function getDFSTree (data, pid) {
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
module.exports = getDFSTree
