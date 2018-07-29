import {loginByUsername, logout, getUserInfo} from '@/backend/api/login'
import {getToken, setToken, removeToken} from '@/backend/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    uname: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_CODE (state, code) {
      state.code = code
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_INTRODUTION (state, introduction) {
      state.introduction = introduction
    },
    SET_SETTING (state, setting) {
      state.setting = setting
    },
    SET_STATUS (state, status) {
      state.status = status
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_AVATRA (state, avatar) {
      state.avatar = avatar
    },
    SET_ROLES (state, roles) {
      state.roles = roles
    }
  },
  actions: {
    // 用户名登陆
    async LoginByUsername ({commit}, userInfo) {
      const uname = userInfo.uname.trim()
      try {
        let data = await loginByUsername(uname, userInfo.pwd)
        data = data.data
        commit('SET_TOKEN', data.token)
        setToken(data.token)
      } catch (err) {
        console.log(err)
      }
    },

    // 退出登陆
    async Logout ({commit, state}) {
      try {
        await logout(state.token)
        commit('SET_TOKEN', '') // 清空token
        commit('SET_ROLES', []) // 清空角色
        removeToken() // 移除token
      } catch (err) {
        console.log(err)
      }
    },

    // 获取用户信息
    async GetUserInfo ({commit, state}) {
      try {
        const response = await getUserInfo(state.token)
        // 做状态码/返回数据判断--待做
        const userInfo = response.data
        commit('SET_NAME', userInfo.uname)
        commit('SET_AVATAR', userInfo.avatar)
        commit('SET_INTRODUTION', userInfo.introduction)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default user
