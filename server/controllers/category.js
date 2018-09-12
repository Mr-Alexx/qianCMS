/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const categoriesModel = require('../models/category')
const getRes = require('../utils/customStatus.js')

class CategoryCtrl {
  async getCategories (ctx) {
    try {
      const res = await categoriesModel.getCategories()
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}

module.exports = new CategoryCtrl()
