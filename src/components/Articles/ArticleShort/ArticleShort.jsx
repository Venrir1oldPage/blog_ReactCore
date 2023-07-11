import ArticleHeader from '../ArticleHeader/ArticleHeader'

import classes from './ArticleShort.module.scss'

const ArticleShort = ({data}) => {
  const {description, ...rest} = data

  return (
    <li className={classes['card']}> 
      <ArticleHeader data={rest}/>
      <p className={classes['text']}>
        {description}
      </p>
    </li>
  )
}

export default ArticleShort

