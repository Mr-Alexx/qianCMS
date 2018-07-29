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

// 热更新
// app.use(hotMiddleware(compiler, {
//   log () {
//     cleanCache(require.resolve('./server'))
//     try {
//       server = require('./server')
//     } catch (err) {
//       console.error('module update failed')
//     }
//   }
// }))

// 允许跨域--上传测试用，生产环境需关闭
app.use(async (ctx, next) => {
  // console.log(ctx.request.method)
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Methods', '*')
  ctx.response.set('Access-Control-Allow-Headers','Content-Type,Access-Token')
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
    uploadDir: __dirname + '/static/upload/images/', // config.uploadImagePath, // ,
    maxFileSize: 1024 * 1024 * 2, // 最大允许2m
    onFileBegin: require('./server/utils/koaBodyUpload')
  }
}))

app.on('error', (err, ctx) => {
  console.log('server error:', err)
})

// static代理访问dist目录下的静态文件(webpack打包后的)
// app.use(koaStatic(path.join(__dirname, 'dist')))
// app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaStatic(path.resolve('dist/')))
app.use(koaStatic(path.resolve('public')))

// static 代理访问static目录下的静态文件（upload）等
// app.use(koaStatic(__dirname + '/static/'))

// 挂在各种的路由规则
app.use(articleRoute.routes())
// 将路由规则挂在倒实例上
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port, () => {
  console.log('Koa is listening port on 3000.')
})