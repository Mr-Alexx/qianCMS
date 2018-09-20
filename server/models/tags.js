/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 14:25:52
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @description: tags表的数据库操作
*/

const db = require('../config/db')
const Op = (require('sequelize')).Op
const tagsSchema = db.import('../schemas/tags.js')
const _ = require('lodash/core')
const vd = require('../utils/validate.js')

class Tags {
  async getTags () {
    return await tagsSchema.findAll()
  }

  async addTag (tag) {
    await tagsSchema.create({
      id: 0,
      name: tag.name,
      create_time: new Date(),
      update_time: new Date()
    })
  }

  async editTag (tag) {
    await tagsSchema.update({
      name: tag.name,
      update_time: new Date()
    }, {
      where: {
        id: tag.id
      }
    })
  }

  async deleteTag (id) {
    await tagsSchema.destroy({
      where: {
        id: {
          [Op.or]: id
        }
      }
    })
  }
}

module.exports = new Tags()

