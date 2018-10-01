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
  meta: {
    title: '首页',
    id: 1
  },
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
    },
    {
      path: 'personalCenter',
      name: 'personal_center',
      meta: {
        title: '个人中心',
        icon: '',
        pid: 1
      },
      component: () => import('../views/home/personalCenter.vue')
    },
    {
      path: 'messageCenter',
      name: 'message_center',
      meta: {
        title: '消息中心',
        icon: '',
        pid: 1
      },
      component: () => import('../views/home/messageCenter.vue')
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
      icon: 'el-icon-setting',
      pid: 1,
      id: 2
    },
    component: Main,
    children: [
      {
        path: 'config',
        name: 'system_config',
        meta: {
          title: '系统配置',
          icon: '',
          pid: 2
        },
        component: () => import('../views/system/config.vue')
      },
      {
        path: 'users',
        name: 'users_manage',
        meta: {
          title: '用户管理',
          icon: '',
          pid: 2
        },
        component: () => import('../views/system/users.vue')
      },
      {
        path: 'roles',
        name: 'roles_manage',
        meta: {
          title: '角色管理',
          icon: '',
          pid: 2
        },
        component: () => import('../views/system/roles.vue')
      },
      {
        path: 'dataCopy',
        name: 'data_copy',
        meta: {
          title: '数据备份',
          icon: '',
          pid: 2
        },
        component: () => import('../views/system/dataCopy.vue')
      },
      {
        path: 'log',
        name: 'system_log',
        meta: {
          title: '日志管理',
          icon: '',
          pid: 2
        },
        component: () => import('../views/system/log.vue')
      },
      {
        path: 'message',
        name: 'system_message',
        meta: {
          title: '消息管理',
          icon: '',
          pid: 2
        },
        component: () => import('../views/system/message.vue')
      },
      {
        path: 'announcement',
        name: 'system_announcement',
        meta: {
          title: '公告管理',
          icon: '',
          pid: 2
        },
        component: () => import('../views/system/announcement.vue')
      }
    ]
  },
  {
    path: '/document',
    name: 'document',
    meta: {
      title: '文档管理',
      icon: 'el-icon-document',
      id: 3,
      pid: 1
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: 'document_index',
        meta: {
          title: '文档管理',
          icon: '',
          pid: 3
        },
        component: () => import('../views/document')
      },
      {
        path: 'edit',
        name: 'document_edit',
        hide: true,
        meta: {
          title: '文档编辑',
          icon: '',
          pid: 3
        },
        component: () => import('../views/document/docEdit.vue')
      },
      {
        path: 'category',
        name: 'document_category',
        meta: {
          title: '类别管理',
          icon: '',
          pid: 3
        },
        component: () => import('../views/category')
      },
      {
        path: 'tags',
        name: 'document_tags',
        meta: {
          title: '标签管理',
          icon: '',
          pid: 3
        },
        component: () => import('../views/tags')
      },
      {
        path: 'message',
        name: 'user_message',
        meta: {
          title: '留言管理',
          icon: '',
          pid: 3
        },
        component: () => import('../views/message')
      }
    ]
  }
]

// 定义一个

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
  login,
  ...appRouter,
  page403,
  page404,
  page500
]
