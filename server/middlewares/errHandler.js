const jwt = require('jsonwebtoken')
const config = require('../config')
const util = require('util')
const verify = util.promisify(jwt.verify) // promise包装

module.exports = function (ctx, next) {
  // return next().catch(err => {
  //   // 401
  //   if (err.status === 401) {
  //     ctx.status = 401
  //     ctx.body = {
  //       code: 401,
  //       message: err.originalError ? err.originalError.message : err.message
  //     }
  //   } else {
  //     throw err
  //   }
  // })
  return async function (ctx, next) {
    try {
      console.log(ctx.headers)
      const token = ctx.headers.authorization
      console.log(token)
      if (token) {
        let payload
        try {
          payload = await verify(token.split(' ')[1], config.secret)
          console.log(payload)
          ctx.user = {
            account: payload.name
          }
        } catch (err) {
          err.status = 401
          ctx.body = {
            code: 401,
            message: err.originalError ? err.originalError.message : err.message
          }
        }
      }
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          message: err.originalError ? err.originalError.message : err.message
        }
      } else {
        throw err
      }
    }
  }
}
