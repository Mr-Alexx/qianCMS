import Main from '../views/Main'

// 不作为Main组件的子组件展示的页面单独写
// 如下
export const page404 = {
  path: '/*',
  name: 'page404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/backend/views/error-page/404.vue')
}

export const page403 = {
  path: '/403',
  name: 'page403',
  meta: {
    title: '404-权限不足'
  },
  component: () => import('@/backend/views/error-page/403.vue')
}

export const page500 = {
  path: '/500',
  name: 'page500',
  meta: {
    title: '500-服务端错误'
  },
  component: () => import('@/backend/views/error-page/500.vue')
}

// 作为Main组件的子组件页面展示但是不在左侧菜单显示的路由
// 写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home', // 默认重定向到home页
  component: Main,
  children: [
    {path: 'home', title: '首页', name: 'home_index', component: () => import('../views/home/home.vue')},
    {path: 'docCtrl', title: '文档管理', name: 'doc_ctrol', component: () => import('../views/doc/docCtrl.vue')},
    {path: 'docEdit', title: '文档管理', name: 'doc_edit', component: () => import('../views/doc/docEdit.vue')}
  ]
}

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
  page403,
  page404,
  page500
]
