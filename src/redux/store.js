import { configureStore, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import reducer from './reducer'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : compose


const store = configureStore({
  reducer: reducer,
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware(thunk),
  devTools:composeEnhancers(),
})

export default store