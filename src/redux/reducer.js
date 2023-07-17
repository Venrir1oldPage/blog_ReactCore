import { combineReducers } from '@reduxjs/toolkit'

import articlesReducer from './articlesReducer'
import userReducer from './userReducer'
import articleReducer from './articleReducer'

const reducer = combineReducers({
  articles:articlesReducer,
  user:userReducer,
  article:articleReducer,
})

export default reducer

