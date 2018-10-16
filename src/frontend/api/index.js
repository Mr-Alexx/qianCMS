import axios from 'axios'
import { router } from '../router'

let host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000'

// 创建axios实例
const http = axios.create({
  baseURL: host + '/api/v1/',
  timeout: 10000 // 超时时间
})

// 响应拦截器
http.interceptors.response.use(res => {
  // 200时成功，否则失败
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    return Promise.reject(res)
  }
}, err => {
  console.log(err)
  // 服务器状态码不是2开头的情况
  // 403 =》权限不足，404 =》访问不存在
  // 500 =》服务器错误
  if (err.response.status) {
    switch (err.response.status) {
      case 403:
        // 权限不足
        alert('权限不足')
        break
      case 404:
        router.replace({
          path: '/404'
        })
        break
      case 500:
        router.replace({
          path: '/500'
        })
        break
    }
    return Promise.reject(err.response)
  }
})

// 封装get请求
const fetch = (url, params) => {
  return http({
    method: 'GET',
    url,
    params
  })
}

// 获取所有文章
export async function getAllArticle () {
  return fetch('article')
}
// 获取分页总数
export async function getArticleSum () {
  return fetch('sum')
}
// 获取分页文章
export async function getPaginationArticle (page, limit) {
  return fetch(`pagination/article?page=${page}&limit=${limit}`)
}
// 根据id获取文章
export async function getArticleById (id) {
  return fetch('article/' + id)
}
// 根据分类id获取所有文章
export async function getArticleByCid (cid) {
  return fetch('article/cid/' + cid)
}
// 根据标签id获取所有文章
export async function getArticleByTid (tid) {
  return fetch('article/tid' + tid)
}

// 获取文章分类
export async function getCategories () {
  return fetch('categories')
}

// 获取标签
export async function getTags () {
  return fetch('tags')
}
