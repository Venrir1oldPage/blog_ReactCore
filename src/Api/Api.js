import axios from 'axios'

const Api = {
  baseUrl: 'https://blog.kata.academy/api',
  token:'',

  async getArticles(page){   
    const token = window.localStorage.getItem('tokenForBlog')
    let offset = (page-1)*6
    try {
      const { data } = await axios({
        method: 'get',
        url:`${this.baseUrl}/articles?limit=6&offset=${offset}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        }})
      return data
    } catch (e) {
      if (e.response.status == 500) return null
    }
  },

  async getArticle(slug){
    const token = window.localStorage.getItem('tokenForBlog')
    try {
      const { data } = await axios({
        method: 'get',
        url:`${this.baseUrl}/articles/${slug}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        }})
      return data
    } catch (e) {
      if (e.response.status == 500) return null
    }
  },

  async createUser(newUser)  {
    try {
      const res = await axios({
        method: 'post',
        url:`${this.baseUrl}/users`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        data: JSON.stringify({ user: newUser }),
      }) 
      const {data} = res
      this.token = data.user.token
      window.localStorage.setItem('tokenForBlog', this.token)
      return data
    }catch (e) {
      if (e.response.status === 422){
        const {data} = e.response
        return data
      }
    }
  },

  async login(loginData) {
    try {
      const res = await axios({
        method: 'post',
        url:`${this.baseUrl}/users/login`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        data: JSON.stringify({ user: loginData }),
      }) 
      const {data} = res
      this.token = data.user.token
      window.localStorage.setItem('tokenForBlog', this.token)
      return data
    }catch (e) {
      if (e.response.status === 422){
        const {data} = e.response
        return data
      }
    }},

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

  async toggleLike(slug, like) {
    const method=like?'post':'delete'
    const token = window.localStorage.getItem('tokenForBlog')
    const res = await axios({
      method: method,
      url:`${this.baseUrl}/articles/${slug}/favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) 
    if (res.status !== 200){
      throw new Error('Server Error!')
    }
  },

}
export default Api

