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

  async addTag (ctx) {
    try {
      const tag = ctx.request.body
      // form验证
      await tagsModel.addTag(tag)
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }

  async editTag (ctx) {
    try {
      const tag = ctx.request.body
      // form验证
      await tagsModel.editTag(tag)
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }

  async deleteTag (ctx) {
    try {
      const id = ctx.request.body.id
      // 验证id
      await tagsModel.deleteTag(id)
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}

module.exports = new TagsCtrl()
