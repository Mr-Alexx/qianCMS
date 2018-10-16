import { getAllArticle, getTags, getArticleSum, getPaginationArticle } from '@/frontend/api'

export default {
  state: {
    menuList: [
      {name: 'index', label: '首页'},
      {name: 'file', label: '归档'},
      {name: 'tag', label: '标签'},
      {name: 'music', label: '音乐'},
      {name: 'life', label: '生活'},
      {name: 'message', label: '留言'}
    ],
    tagList: [],
    activeRoute: 'index',
    articleList: [],
    count: 0
  },
  mutations: {
    'SET_ACTIVEROUTE' (state, routeName) {
      state.activeRoute = routeName
    },
    'SET_ARTICLELIST' (state, list) {
      state.articleList = list
    },
    'SET_TAGLIST' (state, list) {
      state.tagList = list
    },
    'SET_COUNT' (state, count) {
      state.count = count
    }
  },
  actions: {
    getArticleList ({ commit }) {
      getAllArticle().then(res => {
        commit('SET_ARTICLELIST', res.data.data)
      })
    },
    getTagList ({ commit }) {
      getTags().then(res => {
        commit('SET_TAGLIST', res.data.data)
      })
    },
    // 获取分页总数
    async getArticleSum ({ commit }) {
      const res = await getArticleSum()
      commit('SET_COUNT', res.data.data.count || 0)
    },
    async getPaginationArticle ({ commit }, { page, limit }) {
      const res = await getPaginationArticle(page, limit)
      commit('SET_ARTICLELIST', res.data.data || [])
    }
  }
}
