const path = require('path')
const ENV = 'development' // process.env.NODE_ENV
const host = ENV === 'development' ?
  'http://localhost:3000' : 'https://www.imqian.com'

module.exports = {
  // 图片文件上传基础路径
  uploadImagePath: path.normalize(__dirname + '/../../public/upload/images'),
  // 图片上传相对路径，返回前端用
  uploadImageRelativePath: '/upload/images',// host + '/public/upload/images',
  // 上传图片最大值
  uploadImageMaxSize: 1024 * 1024 * 2, // 2M
  // 服务端运行端口
  port: 3000,
  secret: 'Admin-Token'
}
