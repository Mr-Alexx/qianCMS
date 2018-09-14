// 不修改源数据的树构造
// 每次都完整遍历源数据比对,耗时长
class TreeNode {
  constructor (obj, children) {
    for (let key in obj) {
      this[key] = obj[key]
    }
    if (children.length > 0) {
      this.children = children
    }
  }

  static getDFSTree (data, pid) {
    let treeList = []
    data.forEach(row => {
      if (row.pid === pid) {
        let tree = new TreeNode(row, TreeNode.getDFSTree(data, row.id))
        treeList.push(tree)
      }
    })
    return treeList
  }
}

// module.exports = TreeNode

// const testData = [
//   { 'id': 1, 'pid': 0, 'text': '主节点' },
//   { 'id': 2, 'pid': 1, 'text': '第二层,id2' }, 
//   { 'id': 3, 'pid': 1, 'text': '第二层,id3' }, 
//   { 'id': 4, 'pid': 3, 'text': '第三层,id4' }
// ]

// const res = TreeNode.getDFSTree(testData, 0)
// console.log(res)

function getDFSTree (data, pid) {
  let treelist = []
  data.forEach(row => {
    if (row.pid === pid) {
      let tree = row
      let children = getDFSTree(data, row.id)
      if (children.length > 0) {
        tree.children = children
      }
      treelist.push(tree)
    }
  })
  return treelist
}
module.exports = getDFSTree
