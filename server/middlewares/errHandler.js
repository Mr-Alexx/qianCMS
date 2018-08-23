module.exports = function (ctx, next) {
  return next().catch(err => {
    // 401
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        message: err.originalError ? err.originalError.message : err.message
      }
    } else {
      throw err
    }
  })
}
