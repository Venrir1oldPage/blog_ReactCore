import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

import classes from './TagList.module.scss'

const TagList = ({data}) => {
 
  const tags = data.map((i) =>{
    let key = uuidv4()
    return (
      <li className={classes['tag']} key={key}>{i}</li>)
  })

  return (
    <ul className={classes['taglist']}>
      {tags}
    </ul>
  )
}

TagList.propTypes = {
  data:PropTypes.array.isRequired,
}

export default TagList