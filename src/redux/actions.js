import Api from '../Api/Api'


export const initArticles = (articles, articlesCount) =>
  ({ type: 'GOT_ARTICLES', articles:articles, articlesCount:articlesCount})

export const initArticle = (article) =>
  ({ type: 'GOT_ARTICLE', article:article })

export const initErrList = () => ({ type: 'GOT_ERROR_IN_LIST'})
export const initErrInArticle = () => ({ type: 'GOT_ERROR_IN_ARTICLE'})

export const getArticles = (page) => async (dispatch) => {
  try {
    let data= await Api.getArticles(page)
    if (data == 500) {data= await Api.getArticles(page)}
     
    let { articles, articlesCount }=data
    dispatch(initArticles(articles, articlesCount))
  }
  catch (e) {
    dispatch(initErrList())
  }}


export const getArticle = (slug) => async (dispatch) => {
  try {
    let data= await Api.getArticle(slug)
    if (data == 500) {data= await Api.getArticle(slug)}
    let { article} =data
    dispatch(initArticle(article))
  }
  catch (e) {
    dispatch(initErrInArticle())
  }}
  
 