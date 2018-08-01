const time = require('./time.js')
const fs = require('fs')
const config  = require('../config')
const getRes = require('../utils/customStatus.js')

module.exports = function uploadImg (name, file) {
  // 判断上传文件是否合法以及大小是否超过最大值
  if (!file.type.match(/png|jpeg|gif/i)) {
    return ctx.body = getRes(1003)
  }
  if (file.size > config.uploadImageMaxSize) {
    return ctx.body = getRes(1004)
  }
  
  // 以当前日期为目录名（a），在上传文件目录下创建目录a
  // 不存在才创建
  const date = time.ymd()
  const path = config.uploadImagePath + `/${date}`
  // 同步方法，目录不存在则创建
  try {
    fs.statSync(path)
  } catch (err) {
    fs.mkdirSync(path)
  }
  // 修改文件名
  file.name = (new Date()).getTime() + `_${file.name}` 
  // 覆盖path
  file.path = path + `/${file.name}`
  // 保存一个相对路径返回给前端/或者带域名的绝对路径
  const app = this
  app.context.uploadImagePath = app.context.uploadImagePath || {}
  app.context.uploadImagePath[file.name] = `${config.uploadImageRelativePath}/${date}/${file.name}`
  console.log(app.context.uploadImagePath)
}
