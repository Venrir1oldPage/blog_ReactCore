import { Link , useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions'

import classes from  './PageHeader.module.scss'

const PageHeader = ({userName, userImg, logOut, getCurrentUser}) => {
  const nav = useNavigate()
  
  useEffect(() => {
    if(!userName){
      getCurrentUser()
    }
  }, [])

  const logOutClick = () => {
    logOut()
    nav('/articles')
  }

  const noAuth = [<Link to='/sign-in' className={classes['signIn']} key='signIn'>Sign In</Link>,
    <Link  to='/sign-up' className={classes['signUp']} key='signUp'>Sign Up</Link>]

  const profile = [<Link to='/new-article' className={classes['create']} key='create'>Create article</Link>,
    <Link key='user' to='/profile' className={classes['profile']} > <p className={classes['userName']} key='userName' > {userName} </p>
      <img className={classes['avatar']} width={46} height={46} key='userImg'
        src={userImg} alt='avatar' /></Link>,
    <button  onClick={logOutClick} className={classes['logOut']} key='logOut'>Log Out</button>]

  const leftBar =userName? profile:noAuth
    
  return ( <header className={classes['header']}>
    <Link  to="/articles" className={classes['blogName']}><h1 className={classes['blogName']}>Realworld Blog</h1></Link>
    <div className={classes['leftBar']}>
      {leftBar}
    </div>
  </header>)
}

PageHeader.defaultProps = {
  userImg:'https://api.realworld.io/images/smiley-cyrus.jpeg'
}


const mapStateToProps =(state) => ({
  userName:state.user.userName,
  userImg:state.user.userImg,
})

PageHeader.propTypes = {
  userName:PropTypes.string, 
  userImg:PropTypes.string, 
  getCurrentUser:PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,actions)(PageHeader)