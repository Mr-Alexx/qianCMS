/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const articleModel = require('../models/article')

class ArticleCtrl {
  // 根据id获取article
  async getArticleById (ctx) {
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
    const result = await articleModel.getArticleByTid(tid)
    ctx.response.status = 200
    ctx.response.message = 'true'
    // ctx.body = 'I want to love somebody.'
    ctx.body = {
      code: 1,
      message: 'success',
      data: result
    }
  }
  // 根据分类获取文章
  async getArticleByCid (ctx) {
    const cid = ctx.params.cid
    try {
      const result = await articleModel.getArticleByCid(cid)
      ctx.response.status = 200
      ctx.response.message = 'true'
      ctx.body = {
        code: 1,
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
      page = ctx.params.page,
      perpage = ctx.params.perpage
      
    try {
      const result = await articleModel.getArticle(page, perpage)
      console.log(result)
      ctx.response.status = 200
      ctx.response.message = 'success'
      ctx.body = {
        code: 1,
        message: 'success',
        data: result
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  // 添加文章
  async addArticle (ctx) {
    const form = ctx.params
  }
}
// 不推荐使用new来导出，new会消耗内存
// 推荐使用es6的static方法来导出静态方法（因为api构建并不需要实现继承之类的复杂操作），减少内存消耗，但静态方法常驻内存，此处还是使用new方式，具体还待研究（是我太菜）
module.exports =  new ArticleCtrl()