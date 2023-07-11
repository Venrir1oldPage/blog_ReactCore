import defaultState from './defaultState'

const reducer = (state=defaultState, action) =>{
  const newState = structuredClone(state)
  switch (action.type) {
  case('GOT_ARTICLES'):
    newState.articles = action.articles
    newState.loadArticles=false
    newState.articlesCount=action.articlesCount
    return newState
  case('GOT_ARTICLE'):
    newState.article = action.article
    newState.loadArticles=false
    return newState
  case('GOT_ERROR_IN_LIST'):
    newState.loading = false
    newState.errorArticles=true
    return newState
  case('GOT_ERROR_IN_ARTICLE'):
    newState.loadArticle = false
    newState.errorArticle=true
    return newState
  default: return state
  }}

export default reducer



// const defaultState = {
//   articles: [],
//   loadArticles:true,
//   errorArticles:false,
//   articlesCount:null,
// }
