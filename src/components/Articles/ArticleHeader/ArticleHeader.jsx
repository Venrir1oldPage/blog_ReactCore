import { HeartOutlined ,HeartFilled } from '@ant-design/icons' 
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useState } from 'react'
import PropTypes from 'prop-types'

import * as actions from '../../../redux/actions'
import TagList from '../TagList/TagList'

import classes from './ArticleHeader.module.scss'

const ArticleHeader = ({data, toggleLike, slug, userName}) => {
  const {author, favorited, title, tagList:tags, favoritesCount, createdAt} = data

  const [like,setLike] =useState(favorited)
  const [likeCount, setLikeCount] = useState(favoritesCount)

  const toggleFavorite = () => {
    if(!userName) return
    if (like) {
      toggleLike(slug,false)
      setLike(false)
      setLikeCount((count) =>count-1)
    } else { toggleLike(slug,true)
      setLike(true)
      setLikeCount((count) =>count+1)}
  }

  let iconHeart = like?<button className={classes['heartOn']} onClick={toggleFavorite}> <HeartFilled/></button>:
    <button onClick={toggleFavorite} className={classes['heartOff']}><HeartOutlined /></button>
  

  const date = format(new Date(createdAt),'MMMM dd, yyyy')
  let defaultImg = 'https://i.pinimg.com/474x/f4/da/28/f4da28534b1e73299817f668c0052531.jpg'
  let userImg=author.image?author.image:defaultImg
  
  return (
    <header className={classes['block']}>
      <div className={classes['left']}>
        <div className={classes['head']}>
          <Link to={`/articles/${slug}`} className={classes['link']}>
            <h2 className={classes['title']}>{title}</h2>
          </Link>
          {iconHeart}
          <p className={classes['counter']}>{likeCount}</p>
        </div>
        <TagList data={tags}/>
      </div>
      <div className={classes['right']}>
        <div className={classes['info']}>
          <h3 className={classes['userName']}>{author.username}</h3>
          <p className={classes['date']}>{date}</p>
        </div>
        <img className={classes['avatar']} width={46} height={46} src={userImg} alt='avatar' />
      </div>
    </header>
  )
}

const mapStateToProps =(state) => ({
  loading:state.article.loadArticle,
  error:state.article.errorArticle,
  userName:state.user.userName,
})

ArticleHeader.propTypes = {
  data: PropTypes.object.isRequired,
  toggleLike: PropTypes.func.isRequired,
  slug:PropTypes.string, 
  userName:PropTypes.string,
}

export default connect(mapStateToProps, actions)(ArticleHeader)