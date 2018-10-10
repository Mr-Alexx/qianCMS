import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'

Vue.use(Router)

export default new Router({
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
    }
  ],
  mode: 'history'
})
