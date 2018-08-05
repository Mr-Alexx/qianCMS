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
  userCtrl = require('../controllers/user'),
  uploadCtrl = require('../controllers/upload')

/* artilce */

// 通过id获取文章内容
router.get('/api/v1/article/getArtilceById/:id', articleCtrl.getArticleById)

// 通过tid查询文章列表
router.get('/api/v1/article/getArticlesByTid/:tid', articleCtrl.getArticleByTid)

// 通过分页和每页数量查询文章列表
router.get('/api/v1/article/getArticlesByPage/:page/:perpage', articleCtrl.getArticle)

// 添加文章
router.post('/api/v1/article/addArticle', articleCtrl.addArticle)

// 更新文章
// router.put('api/v1/article/update/:id', articleCtrl.updateArticle)

/* 文件上传 */
router.post('/api/v1/upload/image', uploadCtrl.uploadImg)

/* 用户 */
// 登陆
router.post('/api/v1/login/login', userCtrl.login)

module.exports = router
