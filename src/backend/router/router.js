import Main from '../views/Main'

// 作为Main组件的子组件页面展示但是不在左侧菜单显示的路由
// 写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home', // 默认重定向到home页
  component: Main,
  children: [
    {path: 'home', title: '首页', name: 'home_index', component: () => import('../views/home/home.vue')}
  ]
}

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter
]
