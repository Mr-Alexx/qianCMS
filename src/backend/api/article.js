import {fetch, postReq} from '../utils/request.js'
// import {baseUrl} from '../config'

// 获取分页文章
export async function getArticle (page, perpage) {
  return fetch(`/article/pagination`)
}

// 添加文章
export async function addArticle (form) {
  return postReq('/article/add', form)
}

// 编辑文章
// form {id...}
export async function editArticle (form) {
  return postReq('/article/update', form)
}
