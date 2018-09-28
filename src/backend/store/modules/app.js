import {otherRouter, appRouter} from '@/backend/router/router.js'
import { cloneDeep } from '@/backend/utils'

const app = {
  state: {
    sidebarCollapse: false, // 控制左侧菜单是否展开
    // 直接饮用动态路由的话,由于使用strict模型,路由一变化就会导致报错
    // 在此深拷贝一下
    routers: [ // 页面主路由
      cloneDeep(otherRouter),
      ...cloneDeep(appRouter)
    ],
    tagsList: [...cloneDeep(otherRouter.children)], // 标签数组
    openedPageList: [cloneDeep(otherRouter.children[0])], // 打开的页面数组,默认是首页
    currentPageName: 'home_index', // 当前打开的路由
    currentPath: [{ // 面包屑数组
      path: '/',
      meta: {
        title: '首页'
      },
      name: 'home_index'
    }],
    menuList: [...cloneDeep(appRouter)] // 左侧导航路由
  },
  mutations: {
    // 左侧菜单展开/关闭控制
    TOGGLE_SIDEBAR (state) {
      state.sidebarCollapse = !state.sidebarCollapse
    },
    SET_ACTIVEROUTE (state, route) {
      state.activeRoute = route
    },
    SET_OPENEDPAGELIST (state, list) {
      state.openedPageList = list
    },
    SET_CURRENTPAGENAME (state, name) {
      state.currentPageName = name || sessionStorage.currentPageName
    }
  },
  actions: {
    goback ({ commit }, vue) {
      vue.$router.back()
    },
    // 先存sessionStorage
    setOpenedPageList ({commit}, list) {
      sessionStorage.openedPageList = JSON.stringify(list)
      commit('SET_OPENEDPAGELIST', list)
    },
    // 从sessionStorage获取openedPageList
    getOpenedPageList ({commit, state}) {
      const list = sessionStorage.openedPageList
      const _list = list ? JSON.parse(list) : cloneDeep(otherRouter.children[0])
      commit('SET_OPENEDPAGELIST', _list)
    },
    setCurrentpageName ({commit}, pageName) {
      sessionStorage.currentPageName = pageName
      commit('SET_CURRENTPAGENAME', pageName)
    },
    /**
     * @description 新增路由,先判断路由tag是否已经存在
     * @param {Object} route 路由对象
     */
    addTag ({state, dispatch}, route) {
      const res = state.openedPageList.filter(v => route.name === v.name)
      // 判断tag是否已经存在
      if (res.length <= 0) {
        // 不存在则添加tag
        // commit('SET_OPENEDPAGELIST', state.openedPageList.concat(route))
        dispatch('setOpenedPageList', state.openedPageList.concat(route))
      }
      // 激活tag
      dispatch('setCurrentpageName', route.name)
    },
    /**
     * @description 删除路由tag
     * @param {Object} route 路由对象
     * @param {Object} router vue router实例(this.$router)
     */
    removeTag ({state, dispatch}, {route, router}) {
      // 找出route前面的路由,设为激活的
      let prevRoute = null
      state.openedPageList.forEach((v, i) => {
        v.name === route.name && (prevRoute = state.openedPageList[i - 1])
      })
      const res = state.openedPageList.filter(v => v.name !== route.name)
      // commit('SET_OPENEDPAGELIST', res)
      dispatch('setOpenedPageList', res)
      // 必须是删除激活状态的tag才更改激活tag
      if (route.name === state.currentPageName) {
        dispatch('setCurrentpageName', prevRoute.name)
        router.push({
          name: prevRoute.name
        })
      }
    }
  }
}

export default app
