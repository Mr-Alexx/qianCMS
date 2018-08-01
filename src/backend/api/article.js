import axios from 'axios'
import {baseUrl} from '../config'

const getArticle = async (page, perpage) => {
  return axios.get(`${baseUrl}/article/getArticlesByPage/:${page}/:${perpage}`)
}

const addArticle = async (form) => {
  console.log(`${baseUrl}/article/addArticle`)
  return axios.post(`${baseUrl}/article/addArticle`, form)
}

const editArticle = async (form) => {
  return axios.post(`${baseUrl}/article/updateArticle`, form)
}

export {
  getArticle,
  addArticle,
  editArticle
}
