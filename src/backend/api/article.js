import axios from 'axios'

const ENV = process.env.NODE_ENV
const baseUrl = ENV === 'development' ? '/api/' : 'http://imqian.com/api/'

const getArticle = async (page, perpage) => {
  return axios.get(`${baseUrl}v1/article/:${page}/:${perpage}`)
}

const addArticle = async (form) => {
  return axios.post(`${baseUrl}v1/article`)
}

export default {
  getArticle,
  addArticle
}
