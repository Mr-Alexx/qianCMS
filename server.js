/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-10 13:21:37
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @Last Modified time: 2018-07-10 13:21:37
*/

const 
  Koa = require('koa'),
  path = require('path'),
  fs = require('fs'),
  logger = require('koa-logger'),
  koabody = require('koa-body'),
  // bodyparser = require('koa-bodyparser'),
  koaStatic = require('koa-static')
  router = require('koa-router')(),
  articleRoute = require('./server/routes/api'),
  cleanCache = require('./server/middlewares/cleanCache'),
  hotMiddleware = require('koa-webpack-middleware'),
  config = require('./server/config')

const  app = new Koa()

// 允许跨域--上传测试用，生产环境需关闭
app.use(async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Access-Token',
    'Allow': 'HEAD,GET,POST,PUT,PATCH,DELETE'
  })
  await next()
})

//logger
app.use(logger())
// bodyparser
// app.use(bodyparser())
app.use(koabody({
  multipart: true, // 开启文件上传
  formidable: {
    keepExtensions: true,
    uploadDir: config.uploadImagePath,
    maxFileSize: 1024 * 1024 * 2, // 最大允许2m
    onFileBegin: require('./server/utils/koaBodyUpload').bind(app),
    onError: err => {
      const getRes = require('./server/utils/customStatus.js')
      // 文件上传失败 2002
      ctx.body = getRes(2002, err, null)
    }
  }
}))

app.on('error', (err, ctx) => {
  console.log('server error:', err)
})

// 挂在各种的路由规则
app.use(articleRoute.routes())
// 将路由规则挂在倒实例上
app.use(router.routes())
app.use(router.allowedMethods())

// static代理访问dist目录下的静态文件(webpack打包后的)
// 访问的时候不需要加前缀dist/public，加了会404
app.use(koaStatic(path.join(__dirname, 'dist')))
app.use(koaStatic(path.join(__dirname, 'public')))

app.listen(config.port, () => {
  console.log('Koa is listening port on 3000.')
})