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
      // 构造树结构--放前端执行
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }

  async addCategory (ctx) {
    try {
      const form = ctx.request.body
      // 验证form
      await categoriesModel.addCategory(form)
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }

  async updateCategory (ctx) {
    try {
      const form = ctx.request.body
      // 验证form
      await categoriesModel.updateCategory(form)
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }

  async deleteCategory (ctx) {
    try {
      const id = ctx.request.body.cid
      await categoriesModel.deleteCategory(id)
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}

module.exports = new CategoryCtrl()
