import {
  fetch,
  postReq,
  putReq
} from '../utils/request.js'
// import {baseUrl} from '../config'

// 根据id获取文章
export async function getArticleById (id) {
  return fetch('/article/id/' + id)
}

// 获取分页文章
export async function getArticle (page, perpage) {
  return fetch(`/article/pagination`)
}

// 获取所有文章
export async function getAllArticle () {
  return fetch('/article')
}

// 添加文章
export async function addArticle (form) {
  return postReq('/article/add', form)
}

// 编辑文章
// form {id...}
export async function editArticle (form) {
  return putReq('/article', form)
}
// 更新文章状态
export async function updateStatus (data) {
  return putReq('/article/status', data)
}

// 删除文章
export async function deleteArticle (ids) {
  return postReq('/article/delete', ids)
}

// 获取文章分类
export async function getCategories () {
  return fetch('/categories')
}
// 添加文章分类
export async function addCategory (form) {
  return postReq('/article/category', form)
}
// 更新分类
export async function updateCategory (form) {
  return putReq('/article/category', form)
}
// 删除分类
export async function deleteCategory (cid) {
  return postReq('/article/category/delete', {cid})
}

// 获取标签
export async function getTags () {
  return fetch('/tags')
}
// 添加标签
export async function addTag (tag) {
  return postReq('/article/tag', tag)
}
// 修改标签
export async function editTag (tag) {
  return putReq('/article/tag', tag)
}
// 删除标签
export async function deleteTag (id) {
  return postReq('/article/tag/delete', {id})
}
