/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-10 13:21:37
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @Last Modified time: 2018-07-10 13:21:37
*/

const 
  Koa = require('koa'),
  path = require('path'),
  cors = require('@koa/cors'),
  fs = require('fs'),
  logger = require('koa-logger'),
  koabody = require('koa-body'),
  koaStatic = require('koa-static')
  router = require('koa-router')(),
  articleRoute = require('./server/routes/api'),
  errHandler = require('./server/middlewares/errHandler'),
  hotMiddleware = require('koa-webpack-middleware'),
  config = require('./server/config'),
  koaJwt = require('koa-jwt')

const  app = new Koa()

// 允许跨域,cors中间件 https://github.com/koajs/cors
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'] // 不是Authentication 请记住,我个大傻逼
}))

// 401捕获
// app.use(errHandler())

//logger
app.use(logger())

// jwt验证 保护下面的中间件
// 登陆和get请求不需要通过jwt验证
app.use(koaJwt({secret: config.secret}).unless({
  path: [/^\/api\/v1\/(upload)|(user\/admin\/login|logout)/], // 暂时上传不需要认证，后面改造
  method: 'GET'
}))

app.use(koabody({
  multipart: true, // 开启文件上传
  // encoding: 'gzip', // 开启gzip
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

// static代理访问dist目录下的静态文件(webpack打包后的)
// 访问的时候不需要加前缀dist/public，加了会404
app.use(koaStatic(path.join(__dirname, 'dist')))
app.use(koaStatic(path.join(__dirname, 'public')))

// 挂在各种的路由规则
app.use(articleRoute.routes())
// 将路由规则挂在倒实例上
app.use(router.routes())
app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.log('server error:', err)
  // 401捕获
  console.log(err.status)
  if (err.status === 401) {
    ctx.status = 401
    ctx.body = {
      code: 401,
      message: err.originalError ? err.originalError.message : err.message
    }
  }
})

app.listen(config.port, () => {
  console.log('Koa is listening port on 3000.')
})