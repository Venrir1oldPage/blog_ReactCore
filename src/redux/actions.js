import Api from '../Api/Api'

export const initArticles = (articles, articlesCount) => ({ type: 'GOT_ARTICLES', articles:articles, articlesCount:articlesCount})
export const initArticle = (article) => ({ type: 'GOT_ARTICLE', article:article })

export const initErrList = () => {
  return ({ type: 'GOT_ERROR_IN_LIST'})}
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
  
export const  clearServerErrors = () => ({ type: 'CLEAR_SERVER_ERRORS'})
export const initServerError = (errors) => ({ type: 'GOT_ERROR_IN_USER', errors:errors})
export const initUser = (user) => ({ type: 'INIT_USER', user:user })
export const createdUser = () =>({ type: 'USER_CREATED'})

export const createUser= (user) => async (dispatch) => {
  dispatch(clearServerErrors())
  let res = await Api.createUser(user)
  if (res.errors){
    dispatch(initServerError(res.errors))
  }else {
    dispatch(createdUser())
    dispatch(clearServerErrors())
  }}

export const login = (userData) => async (dispatch) => {
  dispatch(clearServerErrors())
  let res = await  Api.login(userData)
  if (res.errors){
    dispatch(initServerError(res.errors))
  }else {
    dispatch(initUser(res.user))
    dispatch(clearServerErrors())
  }}

export const logOut= () => {
  Api.logOut()
  return ({ type: 'LOG_OUT'})
}

export const getCurrentUser = () => async (dispatch) => {
  try {
    let data= await Api.getCurrentUser()
    if (data == 500) {data= await Api.getArticle(user)}
    const {user}= data
    dispatch(initUser(user))
  }
  catch (e) {
    dispatch(initServerError())
  }}


export const editProfile= (userData) => async (dispatch) => {
  dispatch(clearServerErrors())
  let res= await Api.updateUser(userData)
  if (res.errors){
    dispatch(initServerError(res.errors))
  }else {
    dispatch(initUser(res.user))
    dispatch(createdUser())
    dispatch(clearServerErrors())
  }}


// export const editProfile= (userData) => async (dispatch) => {
//   try {
//     let data= await Api.updateUser(userData)
//     if (data == 500) {data= await Api.updateUser(userData)}
//     const {user}= data
//     dispatch(initUser(user))
//   }
//   catch (e) {
//     dispatch(initServerError())
//   }}

export const addArticle= (article) => async (dispatch) => {
  try {
    await Api.addArticle(article)
  }
  catch (e) {
    dispatch(initServerError())
  }}

export const deleteArticle= (slug) => async (dispatch) => {
  try {
    await Api.deleteArticle(slug)
  }
  catch (e) {
    dispatch(initServerError())
  }}

export const  clearArticle = () => ({ type: 'CLEAR_ARTICLE'})

export const editArticle= (article, slug) => async (dispatch) => {
  try {
    await Api.editArticle(article,slug)
  }
  catch (e) {
    dispatch(initServerError())
  }}

export const toggleLike= (slug,like) => async (dispatch) => {
  try {
    await Api.toggleLike(slug, like)
  }
  catch (e) {
    dispatch(initServerError())
  }}