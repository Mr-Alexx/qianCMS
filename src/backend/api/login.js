import http from '../utils/request.js'
import {baseUrl} from '../config'

// 用户名密码登陆
export async function loginByUsername (uname, pwd) {
  return http({
    url: baseUrl + '/login/login',
    method: 'post',
    data: {
      uname,
      pwd
    }
  })
}

// 退出登录
export async function logout () {
  return http({
    url: baseUrl + '/login/logout',
    method: 'post'
  })
}

// 通过token获取用户信息
export async function getUserInfo (token) {
  return http({
    url: 'baseUrl + /user/info',
    method: 'get',
    params: {token}
  })
}
