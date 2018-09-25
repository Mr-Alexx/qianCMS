/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 17:50:53
* @Copyright: 2018 https://www.imqian.com All rights reserved
*/

const Op = (require('sequelize')).Op
const db = require('../config/db')
const articleModel = db.import('../models/article.js') // require('../models/article')
const getRes = require('../utils/customStatus.js')
const _ = require('lodash/core')
const validateForm = require('../utils/validate.js').validateForm

class ArticleCtrl {
  // 根据id获取article
  async getArticleById (ctx) {
    // ctx可以指代ctx
    try {
      const id = ctx.params.id
      const result = await articleModel.findById(id)
      ctx.body = getRes(1001, '', result)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
  // 根据tid获取文章
  async getArticleByTid (ctx) {
    const tid = ctx.params.tid
    try {
      const res = await articleModel.findAll({
        where: {
          tid: tid,
          display: 1
        }
      })
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
  // 根据分类获取文章
  async getArticleByCid (ctx) {
    const cid = ctx.params.cid
    try {
      const res = await articleModel.findAll({
        where: {
          category_id: cid,
          display: 1
        }
      })
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }

  }
  // 获取文章--分页
  async getArticle (ctx) {
    const 
      page = ctx.request.query.page,
      perpage = ctx.request.query.perpage
      
    try {
      // 验证page和perpage
      const res = await articleModel.findAll({
        limit: perpage,
        offset: perpage * (page - 1)
      })  
      ctx.body = getRes(1001, '', res)
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
  // 获取所有文章
  async getAllArticle (ctx) {
    try {
      const res = await articleModel.findAll({
        order: [
          ['id', 'DESC'] // 降序排序,确保最新的在前面
          // ['id', 'ASC'] // 升序
        ]
      })
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
      await articleModel.create({
        id: 0,
        category_id: form.category_id,
        category_name: form.category_name,
        title: form.title,
        smtitle: form.smtitle,
        source: form.source,
        display: form.display,
        tags: form.tags,
        thumbnail: form.thumbnail,
        summary: form.summary,
        html: form.html,
        markdown: form.markdown
      })
      ctx.body = getRes()
    } catch (err) {
      ctx.body = getRes(1002)
      console.log(err)
    }
  }

  // update article
  async updateArticle (ctx) {
    const form = ctx.request.body
    const vali = validateForm(form)
    if (vali) {
      return ctx.body = Res(1002, vali)
    }
    try {
      await articleModel.update({
        category_id: form.category_id,
        category_name: form.category_name,
        title: form.title,
        smtitle: form.smtitle,
        source: form.source,
        display: form.display,
        tags: form.tags,
        thumbnail: form.thumbnail,
        summary: form.summary,
        html: form.html,
        markdown: form.markdown
      },{
        where: {
          id: form.id
        }
      })
      ctx.body = getRes()
    } catch (err) {
      ctx.body = getRes(1002)
      console.log(err)
    }
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
      await articleModel.destroy({
        where: {
          id: {
            [Op.or]: ids
          }
        }
      })
      ctx.body = getRes()
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002, '删除失败')
    }
  }

  async updateStatus (ctx) {
    const ids = ctx.request.body.ids
    const fieldObj = ctx.request.body.fieldObj
    if (!ids || !fieldObj) {
      return getRes(1002, '参数不正确')
    }
    try {
      await articleModel.update(fieldObj, {
        where: {
          id: {
            [Op.or]: ids
          }
        }
      })
      ctx.body = getRes()
    } catch (err) {
      console.log(err)
      ctx.body = getRes(1002)
    }
  }
}
// 不推荐使用new来导出，new会消耗内存
// 推荐使用es6的static方法来导出静态方法（因为api构建并不需要实现继承之类的复杂操作），减少内存消耗，但静态方法常驻内存，此处还是使用new方式，具体还待研究（是我太菜）
module.exports =  new ArticleCtrl()
