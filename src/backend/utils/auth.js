import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 获取token方法
export function getToken () {
  return Cookies.get(TokenKey)
}

// 设置token方法
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

// 移除token方法
export function removeToken () {
  return Cookies.remove(TokenKey)
}
