/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 14:23:50
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @description: category表的数据库操作
*/

const db = require('../config/db')
const categorySchema = db.import('../schemas/category.js')
const _ = require('lodash/core')
const vd = require('../utils/validate.js')

class Category {
  async getCategories () {
    return await categorySchema.findAll({
      order: [
        ['sort', 'ASC'] // 升序排序
      ]
    })
  }

  async addCategory (form) {
    await categorySchema.create({
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
  }
}

module.exports = new Category()
