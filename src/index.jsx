import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import reducer from './redux/reducer'
import App from './components/App/App'

const root = createRoot(document.getElementById('root'))


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

root.render(
  <Provider store = {store}>
    <App />
  </Provider>
)


