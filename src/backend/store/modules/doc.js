import {host} from '@/backend/config/index.js'
import {
  // getArticle,
  // addArticle,
  // editArticle,
  getAllArticle,
  getArticleById,
  getTags,
  getCategories,
  deleteArticle,
  updateStatus
} from '@/backend/api/article.js'

const doc = {
  state: {
    articleList: [], // 文章列表
    form: {
      docType: '1',
      category: {id: 1, name: 'js'},
      title: '',
      smTitle: '',
      source: '1',
      display: true,
      tags: [],
      thumbnail: '',
      summary: '',
      // 文章用
      markdown: '',
      html: ''
    },
    maxSize: 2, // 单位M
    dialogVisible: false,
    initEditorContent: '', // 编辑文章时的初始内容
    tags: [],
    categories: []
  },
  mutations: {
    SET_ARTICLELIST (state, list) {
      state.articleList = list
    },
    SET_THUMBNAIL (state, thumbnail) {
      state.form.thumbnail = thumbnail
    },
    SET_MARKDOWN (state, markdown) {
      state.markdown = markdown
    },
    SET_HTML (state, html) {
      state.html = html
    },
    SET_FORM (state, form) {
      state.form = form
    },
    SET_TAGS (state, tags) {
      state.tags = tags
    },
    SET_CATEGORY (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    /**
     * @description 获取文章列表
     */
    async getArticleList ({commit}, vue) {
      const res = await getAllArticle()
      if (res.data.code === 1001) {
        commit('SET_ARTICLELIST', res.data.data)
      } else {
        vue.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    },

    async getArticleById ({commit}, id) {
      const res = await getArticleById(id)
      return res
    },

    /**
     * @description 文章内容输入变化时的回调
     */
    contentOnChange ({commit}, {markdown, html, text}) {
      commit('SET_MARKDOWN', markdown)
      commit('SET_HTML', html)
    },

    /**
     * @description 缩略图上传成功回调
     */
    thumbnailUploadSuccess ({commit}, res, file) {
      if (res.data) {
        commit('SET_THUMBNAIL', `${host}${res.data.path}`)
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },

    /**
     * @description 缩略图上传前的处理
     * @param {Object} file
     */
    beforeThumbnailUpload (file) {
      const allowPicType = file.type.match(/^(image\/)(png|jpeg|gif)$/i)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!allowPicType) {
        this.$message.error('上传头像图片只能是png/jpeg/gif!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return allowPicType && isLt2M
    },

    /**
     * @description 添加文章
     */
    addArticle () {},

    /**
     * @description 更新文章状态
     */
    async updateArticleStatus ({commit}, {articles, fieldObj}) {
      const ids = articles.map(v => v.id)
      try {
        const res = await updateStatus({ids, fieldObj})
        return res
      } catch (err) {
        console.log(err)
      }
    },

    /**
     * @description 获取标签tags
     */
    async getTags ({commit}) {
      const res = await getTags()
      if (res.data.code === 1001) {
        commit('SET_TAGS', res.data.data)
      }
    },

    /**
     * @description 获取categories
     */
    async getCategories ({commit}) {
      const res = await getCategories()
      if (res.data.code === 1001) {
        commit('SET_CATEGORY', res.data.data)
      }
    },

    /**
     * @description 删除文章
     */
    async deleteArticle ({commit}, articles) {
      const ids = articles.map(article => {
        return article.id
      })
      try {
        const res = await deleteArticle(ids)
        return res
      } catch (err) {
        console.log(`删除文章失败`)
        console.log(err)
      }
    }
  }
}

export default doc
