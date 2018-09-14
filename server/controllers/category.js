/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const categoriesModel = require('../models/category')
const getRes = require('../utils/customStatus.js')
// const TreeNode = require('../utils/treeMaker.js')
const getDFSTree = require('../utils/treeMaker.js')

class CategoryCtrl {
  async getCategories (ctx) {
    try {
      let res = await categoriesModel.getCategories()
      if (res.length <= 0) return ctx.body = getRes(1001, '', [])
      // 去掉无用属性
      res = res.map(v => v.dataValues)
      // 构造树结构
      const tree = getDFSTree(res, 0)
      ctx.body = getRes(1001, '', tree)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}

module.exports = new CategoryCtrl()
