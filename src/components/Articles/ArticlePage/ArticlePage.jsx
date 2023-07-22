import ReactMarkdown from 'react-markdown'
import {useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Spin, Alert, Button, message, Popconfirm } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'



import * as actions from '../../../redux/actions'
import ArticleHeader from '../ArticleHeader/ArticleHeader'

import classes from './ArticlePage.module.scss'

const ArticlePage = ({data, loading, error,userName, getArticle, deleteArticle}) => {
  const nav = useNavigate()

  const {slug} = useParams()

  const antIcon = <LoadingOutlined spin />

  const confirm = () => {
    message.success('Click on Yes')
    deleteArticle(slug)
    nav('/')
  }

  useEffect(()=>{
    getArticle(slug)
  },[slug])

  if(loading) return <Spin className={classes['spin']} size='large' indicator={antIcon}/>
  if(error) return <Alert type='error' showIcon  className={classes['alert']} message='что-то пошло не так' />
  
  if(data) {
    const {description=null, body=null, ...rest} = data
    const {author} = rest

    const buttons = userName===author.username?(<div className={classes['buttons']}>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No">
        <Button danger>Delete</Button>
      </Popconfirm>
      <button type='button' className={classes['edit']} onClick={()=>nav(`/articles/${slug}/edit`)}>Edit</button>
    </div>):null

    return(
      <div className={classes['block']}>
        <ArticleHeader data={rest} />
        <div className={classes['wrapper']}>
          <p className={classes['textShort']}>{description}</p>
          {buttons}
        </div>
        <ReactMarkdown sourcePos className={classes['textFull']}>
          {body}
        </ReactMarkdown>
      </div>
    )
  }
}

const mapStateToProps =(state) => ({
  data:state.article.article,
  loading:state.article.loadArticle,
  error:state.article.errorArticle,
  userName:state.user.userName,
})

export default connect(mapStateToProps, actions)(ArticlePage)