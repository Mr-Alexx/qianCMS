const getRes = require('../utils/customStatus.js')

const upload = {
  async uploadImg (ctx) {
    const file = ctx.request.files.file
    const data = {
      // koa-body中间件中对图片上传处理时保存的全局变量
      path: ctx.uploadImagePath[file.name],
      name: file.name
    }
    ctx.body = getRes(2001, '', data)
  }
}

module.exports = upload
