/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 14:25:52
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @description: tags表的数据库操作
*/

const db = require('../config/db')
const tagsSchema = db.import('../schemas/tags.js')
const _ = require('lodash/core')
const vd = require('../utils/validate.js')

class Tags {
  async getTags () {
    return await tagsSchema.findAll({
      attributes: ['id', 'tname']
    })
  }
}

module.exports = new Tags()

