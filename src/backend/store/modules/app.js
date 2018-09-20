const app = {
  state: {
    sidebarCollapse: false, // 控制左侧菜单是否展开
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
      console.log(route)
      commit('SET_ACTIVEROUTE', route || '/home')
    }
  }
}

export default app
