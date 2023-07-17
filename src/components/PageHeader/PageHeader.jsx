import { Link , useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useEffect } from 'react'


import * as actions from '../../redux/actions'
import  defaultAvatar from '../../assets/UserImg.png'

import classes from  './PageHeader.module.scss'

const PageHeader = ({userName, userImg, logOut, getCurrentUser}) => {
  const nav = useNavigate()
  console.log(userImg)

  useEffect(() => {
    if(!userName){
      getCurrentUser()
    }
  }, [])

  const logOutClick = () => {
    logOut()
    nav('/')
  }

  const img=userImg?userImg:defaultAvatar

  const noAuth = [<Link to='/sign-in' className={classes['signIn']} key='signIn'>Sign In</Link>,
    <Link  to='/sign-up' className={classes['signUp']} key='signUp'>Sign Up</Link>]

  const profile = [<Link to='/' className={classes['create']} key='create'>Create article</Link>,
    <Link key='user' to='/profile' className={classes['profile']} > <p className={classes['userName']} key='userName' > {userName} </p>
      <img className={classes['avatar']} width={46} height={46} key='userImg'
        src={img} alt='avatar' /></Link>,
    <button  onClick={logOutClick} className={classes['logOut']} key='logOut'>Log Out</button>]

  const leftBar =userName? profile:noAuth
    
  return ( <header className={classes['header']}>
    <Link  to="/" className={classes['blogName']}><h1 className={classes['blogName']}>Realworld Blog</h1></Link>
    <div className={classes['leftBar']}>
      {leftBar}
    </div>
  </header>)
}

const mapStateToProps =(state) => ({
  userName:state.user.userName,
  userImg:state.user.userImg,
})

export default connect(mapStateToProps,actions)(PageHeader)