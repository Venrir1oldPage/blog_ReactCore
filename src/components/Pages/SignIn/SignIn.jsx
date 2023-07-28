import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../../redux/actions'
import FormInput from '../../FormInput/FormInput'

import classes from './SignIn.module.scss'

const SignIn = ({serverErrors,userName, clearServerErrors, login}) => {
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
    const user = {
      email: data.email,
      password: data.password,
    }
    login(user)
  }

  useEffect(() => {
    if(userName){
      navigate('/articles')
    }
  }, [userName])


  useEffect(() => {
    if (serverErrors) {
      setError('password', { type: 'serverError', message: 'email or password is wrong' })
      setError('email', { type: 'serverError', message: 'email or password is wrong' })
    }
  }, [serverErrors, errors])

  return (
    <div className={classes['card']} >
      <h2 className={classes['header']}>Sign In</h2>
      <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
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
        <button  type="submit" className={classes['button']} >Login</button>
      </form>
      <p className={classes['question']} >Already have an account? 
        <Link to='/sign-up' className={classes['link']} > Sign Up.</Link></p>
    </div>
  )
}

const mapStateToProps =(state) => ({
  serverErrors:state.user.serverErrors,
  userName:state.user.userName,
})

SignIn.propTypes = {
  serverErrors:PropTypes.object,
  userName:PropTypes.string,
  clearServerErrors:PropTypes.func.isRequired,
  login:PropTypes.func.isRequired,
  isLoggined:PropTypes.bool
}

export default connect(mapStateToProps, actions)(SignIn)