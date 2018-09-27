/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const db = require('../config/db')
const Op = (require('sequelize')).Op
const tagsModel = db.import('../models/tags.js') // require('../models/tags')
const getRes = require('../utils/customStatus.js')

class TagsCtrl {
  async getTags (ctx) {
    try {
      const res = await tagsModel.findAll({
        order: [
          ['id', 'ASC']
        ]
      })
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
      await tagsModel.create({
        id: 0,
        name: tag.name,
        create_time: new Date(),
        update_time: new Date()
      })
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
      await tagsModel.update({
        name: tag.name,
        update_time: new Date()
      }, {
        where: {
          id: tag.id
        }
      })
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
      await tagsModel.destroy({
        where: {
          id: {
            [Op.or]: id
          }
        }
      })
      ctx.body = getRes(1001)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}

module.exports = new TagsCtrl()
