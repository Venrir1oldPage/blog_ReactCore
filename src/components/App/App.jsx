import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PageHeader from '../PageHeader/PageHeader'
import ArticlesList from '../Articles/ArticlesList/ArticlesList'
import ArticlePage from '../Articles/ArticlePage/ArticlePage'


import './App.module.scss'


function App() {

  return (
    <Router>
      <PageHeader />
      <Routes>
        <Route path="/" Component={ArticlesList} />
        <Route path="/:paginate" Component={ArticlesList} />
        <Route path="/articles"  Component={ArticlesList} />
        <Route path="/articles/:slug" Component={ArticlePage} />
      </Routes>
    </Router>
  )
}

export default App


