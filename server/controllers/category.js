/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const db = require('../config/db')
const Op = (require('sequelize')).Op
const categoryModel = db.import('../models/category.js') // require('../models/category')
const getRes = require('../utils/customStatus.js')
// const TreeNode = require('../utils/treeMaker.js')
const getDFSTree = require('../utils/treeMaker.js')

class CategoryCtrl {
  async getCategories (ctx) {
    try {
      let res = await categoryModel.findAll({
        order: [
          ['sort', 'ASC'] // 升序排序
        ]
      })
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
      await categoryModel.create({
        id: 0,
        name: form.name,
        pid: form.pid,
        sort: form.sort,
        url: form.url,
        keywords: form.keywords,
        description: form.discription,
        display: form.display,
        create_time: new Date(),
        update_time: new Date()
      })
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
      await categoryModel.update({
        name: form.name,
        pid: form.pid,
        sort: form.sort,
        url: form.url,
        keywords: form.keywords,
        description: form.description,
        display: form.display,
        update_time: new Date()
      }, {
        where: {
          id: form.id
        }
      })
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }

  async deleteCategory (ctx) {
    try {
      const id = ctx.request.body.cid
      await categoryModel.destroy({
        where: {
          [Op.or]: [
            {id},
            {pid: id}
          ]
        }
      })
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}

module.exports = new CategoryCtrl()
