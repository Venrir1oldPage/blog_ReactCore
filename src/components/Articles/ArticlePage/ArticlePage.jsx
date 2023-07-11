import ReactMarkdown from 'react-markdown'
import {useParams} from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Spin, Alert} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import * as actions from '../../../redux/actions'
import ArticleHeader from '../ArticleHeader/ArticleHeader'

import classes from './ArticlePage.module.scss'

const ArticlePage = ({data, loading, error, getArticle}) => {
  const {slug} = useParams()

  const antIcon = <LoadingOutlined spin />
  
  useEffect(()=>{
    getArticle(slug)
  },[slug])

  if(loading) return <Spin className={classes['spin']} size='large' indicator={antIcon}/>
  if(error) return <Alert type='error' showIcon  className={classes['alert']} message='что-то пошло не так' />
  
  if(data) {
    const {description=null, body=null, ...rest} = data

    return(
      <div className={classes['block']}>
        <ArticleHeader data={rest} />
        <p className={classes['textShort']}>{description}</p>
        <ReactMarkdown sourcePos className={classes['textFull']}>
          {body}
        </ReactMarkdown>
      </div>
    )
  }
}

const mapStateToProps =(state) => ({
  data:state.article,
  loading:state.loadArticles,
  error:state.errorArticle,
})

export default connect(mapStateToProps, actions)(ArticlePage)