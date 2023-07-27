import { useRoutes, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
//import { useEffect } from 'react'

import * as pages from '../components/Pages'

const Router = ({userName, articleData}) => {
  let isOwner=false
  let authorName=false

  if( Object.keys(articleData).length){
    authorName = articleData.author.username
    isOwner=authorName===userName
  }

  const {ArticlesList,ArticlePage,CreateArticlePage, SignUp, SignIn, EditProfile } = pages
  let element = useRoutes([
    {path: '/', element: <ArticlesList />},
    {path: ':paginate', element: <ArticlesList />},
    {path: 'articles', element: <ArticlesList />},
    { path: 'articles/:slug', element: <ArticlePage /> },
    { path: 'articles/:slug/edit', element:userName?isOwner?<CreateArticlePage />:<Navigate to={'/'} replace/>:<Navigate to={'/SignIn'} replace/> },
    { path: 'new-article', element: <CreateArticlePage /> },
    { path: 'sign-up', element: <SignUp /> },
    { path: 'sign-in', element: <SignIn /> },
    { path: 'profile', element:userName?<EditProfile />:<SignIn />},
  ])
  return element
}

const mapStateToProps =(state) => ({
  userName:state.user.userName,
  articleData:state.article.article
})
  
export default connect(mapStateToProps)(Router)