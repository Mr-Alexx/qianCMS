import axios from 'axios'
// import {Message} from 'element-ui
import store from '@/backend/store'
import {getToken} from '@/backend/utils/auth'

// 创建axios实例
const http = axios.create({
  baseURL: '/api/v1/',
  timeout: 8000 // 超时时间
})

// 请求前的拦截
http.interceptors.request.use(config => {
  // 存在token时，发送token
  if (store.getters.totken) {
    config.headers['Auth-Token'] = getToken()
  }
  return config
}, err => {
  // 请求出错时
  console.log(err)
  return Promise.reject(err)
})

export default http
