import { Link } from 'react-router-dom'

import classes from  './PageHeader.module.scss'

const PageHeader = () => {
    
  return ( <header className={classes['header']}>
    <Link  to="/" className={classes['blogName']}><h1 className={classes['blogName']}>Realworld Blog</h1></Link>
    <button className={classes['signIn']}>Sign In</button>
    <button className={classes['signUp']} >Sign Up</button>
  </header>)
}

export default PageHeader