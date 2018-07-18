/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-10 13:21:37
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @Last Modified time: 2018-07-10 13:21:37
*/

const 
  Koa = require('koa'),
  path = require('path'),
  logger = require('koa-logger'),
  bodyparser = require('koa-bodyparser'),
  koaStatic = require('koa-static')
  router = require('koa-router')(),
  articleRoute = require('./server/routes/api'),
  cleanCache = require('./server/middlewares/cleanCache'),
  hotMiddleware = require('koa-webpack-middleware')

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
//logger
app.use(logger())
// bodyparser
app.use(bodyparser())

app.on('error', (err, ctx) => {
  console.log('server error:', err)
})

// static代理访问dist目录下的静态文件(webpack打包后的)
app.use(koaStatic(path.resolve('dist')))

// 挂在各种的路由规则
app.use(articleRoute.routes())
// 将路由规则挂在倒实例上
app.use(router.routes())

app.listen(3000, () => {
  console.log('Koa is listening port on 3000.')
})