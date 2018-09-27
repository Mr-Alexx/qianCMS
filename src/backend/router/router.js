import Main from '../views/Main'

// 不作为Main组件的子组件展示的页面单独写
// 错误页
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

// 登陆
export const login = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登陆'
  },
  component: () => import('@/backend/views/login/login.vue')
}

// 作为Main组件的子组件页面展示且在左侧菜单显示的路由
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home', // 默认重定向到home页
  component: Main,
  children: [
    {path: 'home', title: '首页', name: 'home_index', component: () => import('../views/home/home.vue')}
  ]
}

// 作为Main组件的子组件页面展示,但是不在左侧显示的路由
export const appRouter = [
  {
    path: '/system',
    title: '系统管理',
    name: 'system',
    icon: 'el-icon-setting',
    component: Main,
    children: [
      {path: 'config', title: '系统配置', name: 'system_config', icon: '', component: () => import('../views/system/config.vue')},
      {path: 'users', title: '用户管理', name: 'users_manage', icon: '', component: () => import('../views/system/users.vue')},
      {path: 'roles', title: '角色管理', name: 'roles_manage', icon: '', component: () => import('../views/system/roles.vue')}
    ]
  },
  {
    path: '/document',
    title: '文档管理',
    name: 'document',
    icon: 'el-icon-document',
    component: Main,
    children: [
      {path: 'index', title: '文档管理', name: 'document_index', icon: '', component: () => import('../views/document')},
      {path: 'edit', title: '文档编辑', name: 'document_edit', icon: '', component: () => import('../views/document/docEdit.vue')},
      {path: 'category', title: '类别管理', name: 'document_category', icon: '', component: () => import('../views/category')},
      {path: 'tags', title: '标签管理', name: 'document_tags', component: () => import('../views/tags')}
    ]
  }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
  login,
  ...appRouter,
  page403,
  page404,
  page500
]
