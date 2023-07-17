const defaultState = {
  articles:{
    articles: [],
    loadArticles:true,
    errorArticles:false,
    articlesCount:null,
  },
  article:{
    article:{},
    loadArticle:true,
    errorArticle:false,
  },
  user:{ 
    userName:null,
    userEmail:null,
    userImg:null,
    serverErrors:null,
  }
}
    
export default defaultState