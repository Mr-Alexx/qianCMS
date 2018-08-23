import {fetch, postReq} from '../utils/request.js'
// import {baseUrl} from '../config'

// 用户名密码登陆
export async function loginByUsername (uname, pwd) {
  return postReq('/user/admin/login', {uname, pwd})
}

// 退出登陆
export async function logout () {
  return postReq('/user/admin/logout')
}

// 通过token获取用户信息
export async function getUserInfo (token) {
  return fetch('/user/info', {token})
}
