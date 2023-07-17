import defaultState from './defaultState'
const {article} = defaultState

const articleReducer = (state=article, action) =>{
  const newState = structuredClone(state)
  switch (action.type) {
  case('GOT_ARTICLE'):
    newState.article = action.article
    newState.loadArticle=false
    return newState
  case('GOT_ERROR_IN_ARTICLE'):
    newState.loadArticle = false
    newState.errorArticle=true
    return newState
  default: return state
  }}

export default articleReducer 

