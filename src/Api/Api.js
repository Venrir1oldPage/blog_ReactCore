import axios from 'axios'

const Api = {
  baseUrl: 'https://blog.kata.academy/api',
  pageSize:6,
  token:'',

  async getArticles(page){
    page = page - 1
    const offset = this.pageSize * page
    try {
      const { data } = await axios.get(`${this.baseUrl}/articles?limit=${this.pageSize}&offset=${offset}`)
      return data
    } catch (e) {
      if (e.response.status == 500) return null
    }
  },

  async getArticle(slug){
    try {
      const { data } = await axios.get(`${this.baseUrl}/articles/${slug}`)
      return data
    } catch (e) {
      if (e.response.status == 500) return null
    }
  },

  async createUser(newUser) {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: newUser }),
    })
    const data = await response.json()

    if (!response.ok) {
      throw data.errors
    }

    this.token = data.user.token
    window.localStorage.setItem('token', this.token)
    return data
  },

  async login(loginData) {
    const res = await axios({
      method: 'post',
      url:`${this.baseUrl}/users/login`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify({ user: loginData }),
    }) 
    const {data} = res
    if (res.status !== 200){
      throw data.errors=[{password:'Something went wrong. Check your data'}]
    }
    this.token = data.user.token
    window.localStorage.setItem('tokenForBlog', this.token)
    return data
  },

  
  logOut() {
    this.token = ''
    window.localStorage.removeItem('tokenForBlog')
  },

  async updateUser(newUserData) {
    const token = window.localStorage.getItem('tokenForBlog')

    const res = await axios({
      method: 'put',
      url:`${this.baseUrl}/user`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({ user: newUserData }),
    }) 
    const {data} = res
    if (res.status !== 200){
      throw data.errors=[{password:'Something went wrong. Check your data'}]
    }
    this.token = data.user.token
    window.localStorage.setItem('tokenForBlog', this.token)
    return data
    
  },

  async getCurrentUser() {
    const token = window.localStorage.getItem('tokenForBlog')

    if (!token) {
      throw new Error('Not found token. Probably you are not logged in.')
    }

    const res = await axios({
      method: 'get',
      url:`${this.baseUrl}/user`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }) 
    const {data} = res
    if (res.status !== 200){
      throw data.errors=[{password:'Something went wrong. Check your data'}]
    }
    return data
  },

  async addArticle(articleData) {
    const token = window.localStorage.getItem('tokenForBlog')
    const res = await axios({
      method: 'post',
      url:`${this.baseUrl}/articles`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({ article: articleData }),
    }) 
    const {data} = res
    if (res.status !== 200){
      throw new Error('Server Error!')
    }
    return data
  },

  async deleteArticle(slug) {
    const token = window.localStorage.getItem('tokenForBlog')
    const res = await axios({
      method: 'delete',
      url:`${this.baseUrl}/articles/${slug}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) 
    if (res.status !== 200){
      throw new Error('Server Error!')
    }
  },

  async editArticle(articleData, slug) {
    const token = window.localStorage.getItem('tokenForBlog')
    const res = await axios({
      method: 'put',
      url:`${this.baseUrl}/articles/${slug}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({ article: articleData }),
    }) 
    const {data} = res
    if (res.status !== 200){
      throw new Error('Server Error!')
    }
    return data
  },

}
export default Api

