import {
  // getArticle,
  // addArticle,
  // editArticle,
  getAllArticle,
  getArticleById,
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  getTags
} from '@/backend/api/article.js'
import { getDFSTree } from '@/backend/utils/treeMaker.js'

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
    tag: {
      tags: [],
      formState: {
        visible: false,
        isEdit: false,
        form: {}
      }
    },
    category: {
      originCategories: [], // 保存原始分类数据,未做tree处理的数据
      categoryTree: [],
      dialogVisible: false,
      isEdit: false,
      type: 'root',
      form: {}
    }
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
      state.tag.tags = tags
    },
    SET_TAGFORM (state, formState) {
      state.tag.formState = formState
    },
    SET_ORIGINCATEGORIES (state, categories) {
      state.category.originCategories = categories
    },
    SET_CATEGORYTREE (state, tree) {
      state.category.categoryTree = tree
    },
    SET_CATEGORY (state, category) {
      state.category.dialogVisible = category.dialogVisible
      state.category.isEdit = category.isEdit
      state.category.form = category.form
      state.category.type = category.type
    },
    SET_CATEGORYFORM (state, form) {
      state.category.form = form
    },
    SET_CATEGORYDIALOG (state, visible) {
      state.category.dialogVisible = visible
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
      let res = await getCategories()
      commit('SET_ORIGINCATEGORIES', res.data.data)
      if (res.data.code === 1001) {
        let tree = []
        if (res.data.data.length > 0) {
          tree = getDFSTree(res.data.data, 0)
        }
        commit('SET_CATEGORYTREE', tree)
      }
    },

    /**
     * @description add category
     */
    async addCategory ({commit, dispatch}, {form, vue}) {
      const res = await addCategory(form)
      const success = res.data.code === 1001
      vue.$message({
        message: success ? '添加成功' : '添加失败',
        type: success ? 'success' : 'error',
        duration: 1000
      })
      success && dispatch('getCategories')
    },

    /**
     * @description 删除分类
     */
    async deleteCategory ({commit}, cid) {
      const res = await deleteCategory(cid)
      return res
    },

    /**
     * @description 更新分类
     */
    async updateCategory ({commit, dispatch}, {form, vue}) {
      const res = await updateCategory(form)
      const success = res.data.code === 1001
      vue.$message({
        message: success ? '更新成功' : '更新失败',
        type: success ? 'success' : 'error',
        duration: 1000
      })
      success && dispatch('getCategories')
    },

    changeCategoryForm ({commit}, form) {
      commit('SET_CATEGORYFORM', form)
    },

    showCategoryDialog ({commit, state}, category = {
      isEdit: false,
      type: 'root',
      form: {}
    }) {
      category.form = Object.assign({
        name: '',
        parent: [],
        display: 1,
        sort: 0,
        url: '',
        keywords: '',
        description: ''
      }, category.form)
      commit('SET_CATEGORY', category)
      commit('SET_CATEGORYDIALOG', true)
    },
    closeCategoryDialog ({commit}) {
      commit('SET_CATEGORYDIALOG', false)
    },
    // 标签action
    showTagDialog ({commit}, formState = {
      isEdit: false,
      form: {name: ''},
      visible: true
    }) {
      commit('SET_TAGFORM', formState)
    },
    closeTagDialog ({commit}) {
      commit('SET_TAGFORM', {
        isEdit: false,
        form: {name: ''},
        visible: false
      })
    }
  }
}

export default doc
