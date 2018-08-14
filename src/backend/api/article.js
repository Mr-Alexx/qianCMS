import {fetch, postReq} from '../utils/request.js'
// import {baseUrl} from '../config'

// 获取分页文章
export async function getArticle (page, perpage) {
  return fetch(`/article/getArticlesByPage/:${page}/:${perpage}`)
}

// 添加文章
export async function addArticle (form) {
  return postReq('/article/addArticle', form)
}

// 编辑文章
export async function editArticle (form) {
  return postReq('//article/updateArticle', form)
}
