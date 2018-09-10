/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const articleModel = require('../models/article')
const getRes = require('../utils/customStatus.js')
const validateForm = require('../utils/validate.js').validateForm

class ArticleCtrl {
  // 根据id获取article
  async getArticleById (ctx) {
    // console.log(ctx.header.authorization)
    console.log(ctx.header)
    // ctx可以指代ctx
    const id = ctx.params.id
    const result = await articleModel.getArticleById(id)
    // 采用json形式返回
    // const newResult = JSON.stringify(result)
    ctx.response.status = 200
    ctx.response.message = 'true'
    ctx.body = {
      code: 1,
      message: 'success',
      data: result
    }
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
  
  // add article
  async addArticle (ctx) {
    const header = ctx.headers
    console.log('=========')
    const form = ctx.request.body
    console.log(form)
    // 普通验证
    const vali = validateForm(form)
    // 防注入验证
    // 验证不通过则返回错误码
    if (vali) {
      return  ctx.body = getRes(1002, vali)
    }
    try {
      const result = await articleModel.addArticle(form)
      console.log(result)
      ctx.body = getRes()
    } catch (err) {
      console.log(err)
    }
  }

  // update article
  async updateArticle (ctx) {
    console.log(ctx)
  }
}
// 不推荐使用new来导出，new会消耗内存
// 推荐使用es6的static方法来导出静态方法（因为api构建并不需要实现继承之类的复杂操作），减少内存消耗，但静态方法常驻内存，此处还是使用new方式，具体还待研究（是我太菜）
module.exports =  new ArticleCtrl()
