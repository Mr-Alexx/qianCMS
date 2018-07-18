import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'

Vue.use(VueRouter)

const RouterConfig = {
  routes: routers
}

export const router = new VueRouter(RouterConfig)

// // 暂时不要，加了后页面会是空白
// // 主要是做权限判断用
// // 路由加载前处理
// router.beforeEach((to, from, next) => {
//   // 加载loadingBar，后面自己做一个吧（仿ivews的loadingBar
//   console.log('开始进度条')
// })

// // 路由加载后处理
// router.afterEach((to) => {
//   console.log('结束进度条')
//   // 归回顶部位置
//   window.scrollTo(0, 0)
// })
