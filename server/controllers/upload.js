const fs = require('fs')
const config = require('../config')
const uuid = require('node-uuid')
const time = require('../utils/time.js')
const getRes = require('../utils/customStatus.js')

const upload = {
  async uploadImg (ctx) {
    const file = ctx.request.files.file
    // 判断上传文件是否合法以及大小是否超过最大值
    if (!file.type.match(/png|jpeg|gif/i)) {
      return ctx.body = getRes(1003)
    }
    if (file.size > config.uploadImageMaxSize) {
      return ctx.body = getRes(1004)
    }
    const date = time.ymd() // yy-mm-dd
    console.log(file)
    // 以当前日期为目录名（a），在上传文件目录下创建目录a
    // 不存在才创建
    const path = config.uploadImagePath + `/${date}`
    // 同步方法，目录不存在则创建
    try {
      fs.statSync(path)
    } catch (err) {
      fs.mkdirSync(path)
    }

    // 创建可读流以及文件唯一名称
    const reader = fs.createReadStream(file.path)
    const fileName = uuid.v1() + `_${file.name}` 
    const filePath = path + `/${fileName}`
    console.log(filePath)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    try {
      // 可读流通过管道写入可写流
      reader.pipe(upStream)
      ctx.body = getRes(1001, '', {
        url: config.uploadImageRelativePath + `/${date}/${fileName}`
      })
    } catch (err) {
      ctx.body = getRes(1002)
    }
  }
}

module.exports = upload
