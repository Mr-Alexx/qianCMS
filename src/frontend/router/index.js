import Vue from 'vue'
import Router from 'vue-router'
import loadingBar from '@/components/loading-bar' // 使用loadingbar
import home from '../views/home'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: home
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/article'),
      props: true
    },
    {
      path: '/file',
      name: 'file',
      component: () => import('../views/file')
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('../views/tag')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/music')
    },
    {
      path: '/life',
      name: 'life',
      component: () => import('../views/life')
    },
    {
      path: '/effect',
      name: 'effect',
      component: () => import('../views/effect')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/message')
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  loadingBar.start()
  window.document.title = to.meta.title || '潜潜'
  next()
})

router.afterEach(() => {
  loadingBar.finish()
  window.scrollTo(0, 0)
})
