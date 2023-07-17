import defaultState from './defaultState'
const {articles} = defaultState

const articlesReducer = (state=articles, action) =>{
  const newState = structuredClone(state)
  switch (action.type) {
  case('GOT_ARTICLES'):
    newState.articles = action.articles
    newState.loadArticles=false
    newState.articlesCount=action.articlesCount
    return newState
  case('GOT_ERROR_IN_LIST'):
    newState.loading = false
    newState.errorArticles=true
    return newState
  default: return state
  }}

export default articlesReducer 

