import axios from 'axios'

const getArticle = async (page, perpage) => {
  return aixos.get(`/api/v1/article/:${page}/:${perpage}`)
}

export default = {
  getArticle
}