import axios from 'axios'

const Api = {
  baseUrl: 'https://blog.kata.academy/api/',
  pageSize:5,

  async getArticles(page){
    page = page - 1
    const offset = this.pageSize * page
    try {
      const { data } = await axios.get(`${this.baseUrl}articles?limit=${this.pageSize}&offset=${offset}`)
      return data
    } catch (e) {
      if (e.response.status == 500) return null
    }
  },

  async getArticle(slug){
    try {
      const { data } = await axios.get(`${this.baseUrl}articles/${slug}`)
      return data
    } catch (e) {
      if (e.response.status == 500) return null
    }
  }

  //    async  get(endpoint) => {
  //     const response = await axios.get(endpoint)
  //     return response.data
  //   },

  //   async post(endpoint, data) => {
  //     const response = await axios.post(endpoint, data)
  //     return response.data
  //   },

}
export default Api

