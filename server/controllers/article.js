/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const articleModel = require('../models/article')
const getRes = require('../utils/customStatus.js')
const _ = require('lodash/core')
const validateForm = require('../utils/validate.js').validateForm

class ArticleCtrl {
  // 根据id获取article
  async getArticleById (ctx) {
    // ctx可以指代ctx
    const id = ctx.params.id
    const result = await articleModel.getArticleById(id)
    ctx.body = getRes(1001, '', result)
  }
  // 根据tid获取文章
  async getArticleByTid (ctx) {
    const tid = ctx.params.tid
    try {
      const result = await articleModel.getArticleByTid(tid)
      ctx.body = {
        code: 1001,
        message: 'Success!',
        data: result
      }
    } catch (err) {
      ctx.body = {
        code: 1002,
        message: 'Failed!'
      }
      console.log('getArticleByTig error: ' + err)
    }
  }
  // 根据分类获取文章
  async getArticleByCid (ctx) {
    const cid = ctx.params.cid
    try {
      const result = await articleModel.getArticleByCid(cid)
      ctx.body = {
        code: 1001,
        message: 'success',
        data: result
      }
    } catch (err) {
      console.error('getArticleByCid error', err)
    }

  }
  // 获取文章--分页
  async getArticle (ctx) {
    const 
      page = ctx.request.query.page,
      perpage = ctx.request.query.perpage
      
    try {
      const result = await articleModel.getArticle(page, perpage)
      ctx.body = {
        code: 1001,
        message: 'success',
        data: result
      }
    } catch (err) {
      ctx.body = {
        code: 1002,
        message: 'failed'
      }
      console.log(err)
    }
  }
  // 获取所有文章
  async getAllArticle (ctx) {
    try {
      const res = await articleModel.getAllArticle()
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      ctx.body = getRes(1002)
      console.log(err)
    }
  }
  
  // add article
  async addArticle (ctx) {
    const form = ctx.request.body
    // 普通验证
    const vali = validateForm(form)
    // 防注入验证
    // 验证不通过则返回错误码
    if (vali) {
      return  ctx.body = getRes(1002, vali)
    }
    try {
      const result = await articleModel.addArticle(form)
      ctx.body = getRes()
    } catch (err) {
      console.log(err)
    }
  }

  // update article
  async updateArticle (ctx) {
    console.log(ctx)
  }

  // delete article
  async deleteArticle (ctx) {
    const ids = ctx.request.body
    if (!_.isArray(ids)) {
      return getRes(1002, '参数必须为数组')
    }
    if (ids.length <= 0) {
      return getRes(1002, '参数不能为空数组')
    }
    try {
      const res = await articleModel.deleteArticle(ids)
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002, '删除失败')
    }
  }
}
// 不推荐使用new来导出，new会消耗内存
// 推荐使用es6的static方法来导出静态方法（因为api构建并不需要实现继承之类的复杂操作），减少内存消耗，但静态方法常驻内存，此处还是使用new方式，具体还待研究（是我太菜）
module.exports =  new ArticleCtrl()
