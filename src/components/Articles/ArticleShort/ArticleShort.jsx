import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ArticleHeader from '../ArticleHeader/ArticleHeader'

import classes from './ArticleShort.module.scss'

const ArticleShort = ({data, slug}) => {
  const {description, ...rest} = data

  return (
    <li className={classes['card']}> 
      <ArticleHeader data={rest} slug={slug}/>
      <Link to={`/articles/${slug}`} className={classes['link']}>
        <p className={classes['text']}>
          {description}
        </p>
      </Link>
    </li>
  )
}

ArticleShort.propTypes = {
  data: PropTypes.object.isRequired,
  slug:PropTypes.string,
}
export default ArticleShort

