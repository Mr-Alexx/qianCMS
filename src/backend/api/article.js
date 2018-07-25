import axios from 'axios'

const getArticle = async (page, perpage) => {
  return axios.get(`/api/v1/article/:${page}/:${perpage}`)
}

const addArticle = async (form) => {
  return axios.post(`/api/v1/article`)
}

export default {
  getArticle
}