import axios from 'axios'

export default {
  state: {
    menuList: [
      {name: 'index', label: '首页'},
      {name: 'file', label: '归档'},
      {name: 'tag', label: '标签'},
      {name: 'music', label: '音乐'},
      {name: 'life', label: '生活'},
      {name: 'effect', label: '效果'},
      {name: 'message', label: '留言'}
    ],
    activeRoute: 'index',
    articleList: [
      {
        id: 1,
        title: '测试',
        category_id: 1,
        category_name: 'vue',
        source: '原创',
        thumbnail: '',
        summary: '测试测试测试',
        create_time: '2018-09-21 02:01:25',
        update_time: '2018-09-21 02:01:25',
        views: 288,
        comments: 20,
        likes: 15
      },
      {
        id: 1,
        title: '测试',
        category_id: 1,
        category_name: 'vue',
        source: '原创',
        thumbnail: 'https://www.html-js.cn/upload/images/img20180415212519.jpeg',
        summary: '测试测试测试',
        create_time: '2018-09-21 02:01:25',
        update_time: '2018-09-21 02:01:25',
        views: 288,
        comments: 20,
        likes: 15
      }
    ]
  },
  mutations: {
    'SET_ACTIVEROUTE' (state, routeName) {
      state.activeRoute = routeName
    },
    'SET_ARTICLELIST' (state, list) {
      state.articleList = list
    }
  },
  actions: {
    getArticles ({commit}) {
      axios.get('http://localhost:3000/api/v1/article').then(res => {
        commit('SET_ARTICLELIST', res.data.data)
      })
    }
  }
}
