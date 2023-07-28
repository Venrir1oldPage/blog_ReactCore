import { BrowserRouter } from 'react-router-dom'
import { Offline } from 'react-detect-offline'
import { Alert} from 'antd'

import Router from '../routes'
import PageHeader from '../PageHeader/PageHeader'

import classes from './App.module.scss'

function App() {
  return (
    <BrowserRouter className={classes['page']} >
      <Offline>
        <Alert className={classes['alert']}  showIcon message='Кажется, у вас нет интернета. Проверьте сетевое соединение' type="error" />
      </Offline>
      <PageHeader />
      <Router />
    </BrowserRouter>
  )
}

export default App
