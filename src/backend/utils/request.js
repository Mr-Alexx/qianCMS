import axios from 'axios'
// import {Message} from 'element-ui
import store from '@/backend/store'
import {getToken, removeToken} from '@/backend/utils/auth'
import {router} from '../router/index.js'

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000'

// 创建axios实例
const http = axios.create({
  baseURL: host + '/api/v1/',
  timeout: 10000 // 超时时间
})

// 请求前的拦截
http.interceptors.request.use(config => {
  // 存在token时，发送token
  if (store.state.user.token) {
    // 不能设置该header属性值,这是上传文件用的,设置的话会将post的data转成from-data,传递值不对
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return config
}, err => {
  // 请求出错时
  console.log(err)
  return Promise.reject(err)
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
  // 401 =》 未登陆，402 =》token过期，403 =》权限不足，404 =》访问不存在
  // 500 =》服务器错误
  if (err.response.status) {
    switch (err.response.status) {
      case 401:
        // 未登陆
        router.replace({
          path: '/login'
        })
        break
      case 402:
        // 登陆过期，对用户进行提示，清除本地token和vuex中的token
        // 提示，暂时保留
        removeToken()
        store.commit('SET_TOKEN', '')
        // 跳转登陆页，并将当前页面地址传过去，登陆成功返回用
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      case 403:
        // 曲线不足
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
export function fetch (url, params) {
  return http({
    method: 'GET',
    url,
    params
  })
}

// 封装post请求
export function postReq (url, data) {
  return http({
    method: 'POST',
    url,
    data
  })
}

// 封装put请求
export function putReq (url, data) {
  return http({
    method: 'PUT',
    url,
    data
  })
}
