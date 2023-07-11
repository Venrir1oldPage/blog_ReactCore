import { HeartOutlined ,HeartFilled } from '@ant-design/icons' 
import { format } from 'date-fns'

import  defaultAvatar from '../../../assets/UserImg.png'
import TagList from '../TagList/TagList'

import classes from './ArticleHeader.module.scss'

const ArticleHeader = ({data}) => {

  const {author, favorited, title, tagList:tags, favoritesCount, createdAt} = data

  const date = format(new Date(createdAt),'MMMM dd, yyyy')
  const iconHeart = favorited?<HeartFilled className={classes['heartOn']}/>:
    <HeartOutlined className={classes['heartOff']}/>
  
  return (
    <header className={classes['block']}>
      <div className={classes['left']}>
        <div className={classes['head']}>
          <h2 className={classes['title']}>{title}</h2>
          {iconHeart}
          <p className={classes['counter']}>{favoritesCount}</p>
        </div>
        <TagList data={tags}/>
      </div>
      <div className={classes['right']}>
        <div className={classes['info']}>
          <h3 className={classes['userName']}>{author.username}</h3>
          <p className={classes['date']}>{date}</p>
        </div>
        <img className={classes['avatar']} width={46} height={46} src={author.image || defaultAvatar} alt='avatar' />
      </div>
    </header>
  )
}

export default ArticleHeader