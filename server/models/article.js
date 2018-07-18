/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-12 14:23:50
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @description: article表的数据库操作
*/

const db = require('../config/db')
const articleSchema = db.import('../schemas/article.js')

class Article {
  // 查找指定id的文章
  async getArticleById (id) {
    return await articleSchema.findById(id)
  }
  // 查找指定tid的文章，且display状态为1的
  async getArticleByTid (tid) {
    return await articleSchema.findAll({
      where: {
        tid: tid,
        display: 1
      }
    })
  }
  // 查找指定cid的文章，切display状态为1的
  async getArticleByCid (cid) {
    return await articleSchema.findAll({
      where: {
        category_id: cid,
        display: 1
      }
    })
  }
  // 分页获取文章
  /**
   * @description 获取分页文章内容
   * @param {Number} page 页码
   * @param {Number} perpage 每页条数
  */
  async getArticle (page, perpage) {
    // 必须保证两个数是数字类型
    page = Number(page)
    perpage = Number(perpage)
    return await articleSchema.findAll({
      limit: perpage,
      offset: perpage * (page - 1)
    })  
  }
}

module.exports = new Article()