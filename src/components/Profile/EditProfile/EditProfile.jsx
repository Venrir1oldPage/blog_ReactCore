import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {connect} from 'react-redux'

import FormInput from '../FormInput/FormInput'
import * as actions from '../../../redux/actions'

import classes from './EditProfile.module.scss'

const EditProfile = ({userName,userImg, userEmail, serverErrors, clearServerErrors, editProfile}) => {

  useEffect(
    () => () => {
      clearServerErrors()
    },[])

  const {
    register, handleSubmit,
    formState: { errors }, setError
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      image:data.avatar||userImg,
    }
    editProfile(newUser)
  }

  useEffect(() => {
    if (serverErrors) {
      Object.entries(serverErrors).forEach(([key, value]) => {
        if (key === 'username' || key === 'email') {
          const field = key
          setError(field, { type: 'serverError', message: `${value}` })
        }
      })
    }
  }, [serverErrors, errors])

  return (
    <div className={classes['card']}>
      <h2 className={classes['header']}>Edit Profile</h2>
      <form className={classes['form']} name='signUp' onSubmit={handleSubmit(onSubmit)}>
        <FormInput placeholder="New username"  type='username' label='Username' error={errors.username} 
          autofocus  defaultValue={userName}
          options={register('username', {
            required: 'The field must be filled in',
            pattern: {
              value: /^[a-z][a-z0-9]*$/,
              message: 'You can only use lowercase English letters and numbers',
            },
            minLength: {
              value: 3,
              message: 'User name needs to be at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'User name must contain no more than 20 characters',
            },
          })}
        />
        <FormInput  type='email'  label="Email address" placeholder="New email address" 
          error={errors.email} defaultValue={userEmail}
          options={register('email', {
            required: 'The field must be filled in',
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'The email must be valid',
            },
          })}
        />
        <FormInput   label="New password"  placeholder=" New password" type="password" error={errors.password}
          options={register('password', {
            required: 'The field must be filled in',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must contain no more than 40 characters.',
            },
          })}
        />
        <FormInput  type='text'  label="Avatar image (url)" placeholder="Avatar image" 
          error={errors.avatar} 
          options={register('avatar', {
            pattern: {
              value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
              message: 'Must be URL',
            },
          })}
        />
        <button  type="submit" className={classes['button']}>Save</button>
      </form>
    </div>
  )
}

const mapStateToProps =(state) => ({
  serverErrors:state.user.serverErrors,
  userName:state.user.userName,
  userImg:state.user.userImg,
  userEmail:state.user.userEmail
})

export default connect(mapStateToProps, actions)(EditProfile)