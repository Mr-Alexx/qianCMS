import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
// import {getToken} from '../utils/auth.js'
import store from '../store'

Vue.use(VueRouter)

const RouterConfig = {
  routes: routers
}

export const router = new VueRouter(RouterConfig)

// // 暂时不要，加了后页面会是空白
// // 主要是做权限判断和进度条控制
// // 路由加载前处理
router.beforeEach((to, from, next) => {
  // 加载loadingBar，后面自己做一个吧（仿ivews的loadingBar
  Vue.$loadingbar.start() // 开始进度条
  window.document.title = to.meta.title || 'QianCMS' // title设置
  // 判断是否已登陆
  // const token = getToken()
  const token = store.state.user.token
  // console.log(token)
  if (!token && to.name !== 'login') { // 未登陆且当前不是登陆页
    // 跳转到登陆页
    next({
      path: '/login'
      // query: {redirect: to.fullPath} // 路由传参
    })
  } else if (token && to.name === 'login') { // 已登陆且当前是登陆页
    // 跳转到主页
    next({
      name: 'home'
    })
  } else { // 其它情况直接显示当前页
    next()
  }
})

// // 路由加载后处理
router.afterEach((to, from) => {
  // 一些处理--暂时没有
  // 结束loadingbar
  Vue.$loadingbar.finish()
  // 归回顶部位置
  window.scrollTo(0, 0)
})
