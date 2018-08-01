const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'localhost:3000' // 'https://www.imqian.com'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'localhost:3000/api/v1' // 'https://www.imqian.com/api/v1'

export {
  host,
  baseUrl
}
