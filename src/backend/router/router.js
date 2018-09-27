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
    {
      path: 'home',
      name: 'home_index',
      meta: {
        title: '首页'
      },
      component: () => import('../views/home/home.vue')
    }
  ]
}

// 作为Main组件的子组件页面展示,但是不在左侧显示的路由
export const appRouter = [
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    component: Main,
    children: [
      {
        path: 'config',
        name: 'system_config',
        meta: {
          title: '系统配置',
          icon: ''
        },
        component: () => import('../views/system/config.vue')
      },
      {
        path: 'users',
        name: 'users_manage',
        meta: {
          title: '用户管理',
          icon: ''
        },
        component: () => import('../views/system/users.vue')
      },
      {
        path: 'roles',
        name: 'roles_manage',
        meta: {
          title: '角色管理',
          icon: ''
        },
        component: () => import('../views/system/roles.vue')
      }
    ]
  },
  {
    path: '/document',
    name: 'document',
    meta: {
      title: '文档管理',
      icon: 'el-icon-document'
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: 'document_index',
        meta: {
          title: '文档管理',
          icon: ''
        },
        component: () => import('../views/document')
      },
      {
        path: 'edit',
        name: 'document_edit',
        hide: true,
        meta: {
          title: '文档编辑',
          icon: ''
        },
        component: () => import('../views/document/docEdit.vue')
      },
      {
        path: 'category',
        name: 'document_category',
        meta: {
          title: '类别管理',
          icon: ''
        },
        component: () => import('../views/category')
      },
      {
        path: 'tags',
        name: 'document_tags',
        meta: {
          title: '标签管理',
          icon: ''
        },
        component: () => import('../views/tags')
      }
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
