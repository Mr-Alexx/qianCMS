/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-10 13:21:15
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @Last Modified time: 2018-07-10 13:21:15
*/

const router = require("koa-router")()
const 
  articleCtrl = require('../controllers/article'),
  categoryCtrl = require('../controllers/category'),
  tagsCtrl = require('../controllers/tags'),
  userCtrl = require('../controllers/user')

// article
router
  .get('/api/v1/article/:id', articleCtrl.getArticleById)
  .get('/api/v1/article/:tid/articles', articleCtrl.getArticleByTid)
  .get('/api/v1/article/:page/:perpage', articleCtrl.getArticle)
  .post('api/v1/article/add', articleCtrl.addArticle)

module.exports = router