import {otherRouter, appRouter} from '@/backend/router/router.js'

const app = {
  state: {
    sidebarCollapse: false, // 控制左侧菜单是否展开
    routers: [ // 页面主路由
      otherRouter,
      ...appRouter
    ],
    tagsList: [...otherRouter.children], // 标签数组
    openedPageList: [{ // 打开的页面数组
      path: '/',
      title: '首页',
      name: 'home_index'
    }],
    currentPageName: '',
    currentPath: [{ // 面包屑数组
      path: '/',
      title: '首页',
      name: 'home_index'
    }],
    menuList: [...appRouter], // 左侧导航路由
    activeRoute: '/home' // 默认激活路由
  },
  mutations: {
    // 左侧菜单展开/关闭控制
    TOGGLE_SIDEBAR (state) {
      state.sidebarCollapse = !state.sidebarCollapse
    },
    SET_ACTIVEROUTE (state, route) {
      state.activeRoute = route
    }
  },
  actions: {
    goback ({ commit }, vue) {
      vue.$router.back()
    },
    setActiveRoute ({commit}, route) {
      sessionStorage.setItem('activeRoute', route)
      commit('SET_ACTIVEROUTE', route)
    },
    getActiveRoute ({commit}) {
      const route = sessionStorage.getItem('activeRoute')
      commit('SET_ACTIVEROUTE', route || '/home')
    },
    addTag ({commit, state}, route) {
      // state.openedPageList.push(route)
    }
  }
}

export default app
