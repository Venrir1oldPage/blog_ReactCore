import { useForm, useFieldArray } from 'react-hook-form'
import { useParams,useNavigate } from 'react-router-dom'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import { Spin, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import * as actions from '../../../redux/actions'
import FormInput from '../../Profile/FormInput/FormInput'

import classes from './CreateArticlePage.module.scss'

const CreateArticlePage = ({addArticle, getArticle, data, loading, error, editArticle}) => {
  const nav = useNavigate()
  const {slug} = useParams()

  useEffect(()=>{
    getArticle(slug)
  },[slug])

  let {title, description, body, tagList } = data

  useEffect(() => {
    if (slug) {
      setValue('title', title)
      setValue('description', description)
      setValue('text', body)
      remove()
      if(tagList) {tagList.forEach((tag) => {
        append({ tag })
      })}
      append({ tag: '' })
    }
  }, [slug, title, description, body, tagList])
 
  const {
    register, handleSubmit,control,
    formState: { errors }, setValue,
  } = useForm({
    defaultValues: {
      title: title||'',
      description:description|| '',
      text:body|| '',
      tags: [{ tag: '' }],
    },
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (data) => {
    const newArticle = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: [],
    }
    data.tags.forEach((item) => {
      const { tag } = item
      if (tag.trim()) {
        newArticle.tagList.push(tag.trim())
      }
    })
    if(!slug){
      addArticle(newArticle)
    } else{
      editArticle(newArticle, slug)
    }
    
    nav('/')
  }
  const antIcon = <LoadingOutlined spin />
  if(loading) return <Spin className={classes['spin']} size='large' indicator={antIcon}/>
  if(error) return <Alert type='error' showIcon  className={classes['alert']} message='что-то пошло не так' />

  return (
    <div className={classes['block']}>
      <h2>Create new article</h2>
      <form name='createArticle' onSubmit={handleSubmit(onSubmit)}>
        <FormInput placeholder="Title"  type='text' label='Title' error={errors.username} autofocus 
          options={register('title', {
            required: 'The field must be filled in',
            minLength: {
              value: 3,
              message: 'User name needs to be at least 3 characters',
            },
            maxLength: {
              value: 50,
              message: 'User name must contain no more than 50 characters',
            },
          })}
        />
        <FormInput placeholder="Short description" type='text' label='Short description' error={errors.username} autofocus
          options={register('description', {
            required: 'The field must be filled in',
            minLength: {
              value: 3,
              message: 'User name needs to be at least 3 characters',
            },
            maxLength: {
              value: 300,
              message: 'User name must contain no more than 300 characters',
            },
          })}
        />
        <FormInput placeholder="Text" label='Text' type='textarea' error={errors.username} autofocus
          options={register('text', {
            required: 'The field must be filled in',
            minLength: {
              value: 3,
              message: 'User name needs to be at least 3 characters',
            },
            maxLength: {
              value: 150,
              message: 'User name must contain no more than 150 characters',
            },
          })}
        />
        <h3 className={classes['inputLabel']}>Tags</h3>
        {fields.map((tag, index, arr) => (
          <div key={tag.id} className={classes['tagWrapper']}>
            <FormInput placeholder="Tag" className={classes['tagInput']}  options={register(`tags.${index}.tag`)}/>
            <button className={classes['tagDel']}  onClick={() => remove(index)}>Delete</button>
            {arr.length - 1 === index ? <button className={classes['tagAdd']}  onClick={() => append({ tag: '' })}>Add tag</button> :null}
          </div>
        ))}
        <button type="submit" className={classes['buttonCreate']} >Create</button>
      </form>
    </div>
  )
}

const mapStateToProps =(state) => ({
  data:state.article.article,
  userName:state.user.userName,
  loading:state.article.loadArticle,
  error:state.article.errorArticle,
})

export default connect(mapStateToProps, actions)(CreateArticlePage)

