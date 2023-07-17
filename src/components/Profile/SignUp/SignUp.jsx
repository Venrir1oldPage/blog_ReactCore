import {Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {connect} from 'react-redux'


import * as actions from '../../../redux/actions'
import FormInput from '../FormInput/FormInput'

import classes from './SignUp.module.scss'

const SignUp = ({serverErrors, clearServerErrors, createUser}) => {
  const navigate = useNavigate()
  
  useEffect(
    () => () => {
      clearServerErrors()
    },[])
  
  const {
    register, handleSubmit,
    formState: { errors }, setError,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    createUser(newUser)
    navigate('/sign-in')
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
      <h2 className={classes['header']}>Create new account</h2>
      <form name='signUp' onSubmit={handleSubmit(onSubmit)}>
        <FormInput placeholder="Username"  type='username' label='Username' error={errors.username} autofocus
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
        <FormInput  type='email'  label="Email address" placeholder="Email address" error={errors.email}
          options={register('email', {
            required: 'The field must be filled in',
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'The email must be valid',
            },
          })}
        />
        <FormInput   label="Password"  placeholder="Password" type="password" error={errors.password}
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
        <FormInput  label="Repeat Password" placeholder="Password" type="password" error={errors.repeatPassword}
          options={register('repeatPassword', {
            required: 'The field must be filled in',
            validate: (val, formValues) => formValues.password === val || 'Your passwords do no match',
          })}
        />

        <FormInput  type="checkbox" id="agree" label='I agree to the processing of my personal information'
          options = {register('agree', { required: 'You should agree' })}  error={errors.agree}
        />
        <button type="submit" className={classes['button']} disabled={Object.keys(errors).length} >Create</button>
        <p className={classes['question']} >Already have an account? 
          <Link to='/sign-in' className={classes['link']} > Sign In.</Link></p>
      </form>
    </div>
  )
}

const mapStateToProps =(state) => ({
  serverErrors:state.user.serverErrors,
})

export default connect(mapStateToProps, actions)(SignUp)