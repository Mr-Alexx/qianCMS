/*
* @Author: Mr.Alex (潜)
* @Date: 2018-07-10 13:21:15
* @Copyright: 2018 https://www.imqian.com All rights reserved
* @Last Modified time: 2018-07-10 13:21:15
*/

const router = require("koa-router")() // get/post/put/del/all

const 
  articleCtrl = require('../controllers/article'),
  categoryCtrl = require('../controllers/category'),
  tagsCtrl = require('../controllers/tags'),
  userCtrl = require('../controllers/user'),
  uploadCtrl = require('../controllers/upload')
console.log(router)
/* artilce */

// 通过id获取文章内容
router.get('/api/v1/article/id/:id', articleCtrl.getArticleById)

// 通过tid查询文章列表
router.get('/api/v1/article/tid/:tid', articleCtrl.getArticleByTid)
// 通过分类(cid)查询文章列表
router.get('/api/v1/article/cid/:cid', articleCtrl.getArticleByCid)

// 通过分页和每页数量查询文章列表--page采用query形式获取参数 ?limit=x&offset=x
router.get('/api/v1/article/pagination', articleCtrl.getArticle)
// 获取所有文章
router.get('/api/v1/article', articleCtrl.getAllArticle)

// 添加文章
router.post('/api/v1/article/add', articleCtrl.addArticle)

// 更新文章
router.put('/api/v1/article', articleCtrl.updateArticle)
// 更新文章状态
router.put('/api/v1/article/status', articleCtrl.updateStatus)

// 删除文章
router.post('/api/v1/article/delete', articleCtrl.deleteArticle)

/* 文件上传 */
router.post('/api/v1/upload/image', uploadCtrl.uploadImg)

/* 用户 */
// 登陆
router.post('/api/v1/user/admin/login', userCtrl.login)
router.post('/api/v1/user/admin/logout', userCtrl.logout)

// 获取标签
router.get('/api/v1/article/tag', tagsCtrl.getTags)
// 获取文章类型
router.get('/api/v1/article/category', categoryCtrl.getCategories)

module.exports = router
