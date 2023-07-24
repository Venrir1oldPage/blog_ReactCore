import { useEffect, useState } from 'react'
import { Spin, Alert} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

import {getArticles}  from '../../../redux/actions'
import CustomPafination from '../CustomPagination/CustomPagination'
import ArticleShort from '../ArticleShort/ArticleShort'

import classes from './ArticlesList.module.scss'

const ArticlesList = ({articlesData, articlesCount, loading, error, getArticles}) => {

  const [page, setPage] = useState(1)

  const antIcon = <LoadingOutlined spin />

  useEffect(() => {
    getArticles(page)
  }, [page])

  const change = (page) => {
    setPage(page)
  }

  if(loading) return <Spin className={classes['spin']} size='large' indicator={antIcon}/>
  if(error) return <Alert type='error' showIcon  className={classes['alert']} message='что-то пошло не так' />

  let articles = articlesData.map((i)=> {
    let key = uuidv4()
    const {slug, ...data}=i
    return (
      <ArticleShort data={data} slug={slug} key={key}/>
    )
  })

  return (
    <div className={classes['articlesPage']}>
      <ul className={classes['list']}>
        {articles}
      </ul>
      <CustomPafination onChange={change} paginationCount={articlesCount} current={page} className={classes['pagination']}/>
    </div>
  )
}


const mapStateToProps =(state) => ({
  articlesData:state.articles.articles,
  articlesCount:state.articles.articlesCount,
  loading:state.articles.loadArticles,
  error:state.articles.errorArticles,
})

ArticlesList.defaultProps ={
  loading:true,
  error:false,
}

ArticlesList.propTypes = {
  loading:PropTypes.bool,
  error:PropTypes.bool,
  getArticles:PropTypes.func.isRequired,
  articlesData: PropTypes.array.isRequired,
  articlesCount:PropTypes.number,
}

export default connect(mapStateToProps, {getArticles})(ArticlesList)


