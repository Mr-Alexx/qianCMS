/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const tagsModel = require('../models/tags')
const getRes = require('../utils/customStatus.js')

class TagsCtrl {
  async getTags (ctx) {
    try {
      const res = await tagsModel.getTags()
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}

module.exports = new TagsCtrl()
