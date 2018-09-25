/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const db = require('../config/db')
const userModel = db.import('../models/user.js') // require('../models/user')
const getRes = require('../utils/customStatus.js')
const valiSql = require('../utils/validate.js').valiSql
const jwt = require('jsonwebtoken')
const secret = require('../config').secret

class UserCtrl {
  // 登陆
  async login (ctx) {
    const {uname, pwd} = ctx.request.body
    // 普通验证
    if (!uname || uname.length < 6 || uname.length > 20) {
      return ctx.body = getRes(1002, '用户名非法')
    }
    if (!pwd || pwd.length < 6 || pwd.length > 20) {
      return ctx.body = getRes(1002, '密码非法')
    }
    // 防注入验证
    if (valiSql(uname) || valiSql(pwd)) {
      return ctx.body = getRes(1002, '不能含有sql关键字')
    }
    try {
      const res = await userModel.find({
        where: {
          uname,
          pwd
        }
      })
      if (!res) {
        return ctx.body = getRes(1002, '登陆失败，账号或密码不正确')
      }
      // 登录成功
      const userToken = {
        name: uname
      }
      // , {expiresIn: '100h'}
      const token = jwt.sign(userToken, secret) // token签名 有效期为1小时
      ctx.body = getRes(1001, '登陆成功！', {
        token
      })
    } catch (err) {
      ctx.body = getRes(1002)
      console.log(err)
    }
  }

  // 退出登陆
  async logout (ctx) {
    console.log(ctx.header)
  }
}
// 不推荐使用new来导出，new会消耗内存
// 推荐使用es6的static方法来导出静态方法（因为api构建并不需要实现继承之类的复杂操作），减少内存消耗，但静态方法常驻内存，此处还是使用new方式，具体还待研究（是我太菜）
module.exports =  new UserCtrl()
