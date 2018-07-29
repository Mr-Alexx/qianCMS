const app = {
  state: {
    sidebarCollapse: false // 控制左侧菜单是否展开
  },
  mutations: {
    // 左侧菜单展开/关闭控制
    TOGGLE_SIDEBAR (state) {
      state.sidebarCollapse = !state.sidebarCollapse
    }
  },
  actions: {}
}

export default app
