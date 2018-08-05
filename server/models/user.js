/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 14:23:50
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @description: article表的数据库操作
*/

const db = require('../config/db')
const userSchema = db.import('../schemas/user.js')

class User {
  /**
   * @description 验证表单编辑内容
   * @param {Object} form
  */
  async login ({uname, pwd}) {
    return await userSchema.find({
      where: {
        uname, pwd
      }
    })
  }
}

module.exports = new User()
