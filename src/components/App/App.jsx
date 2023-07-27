import { BrowserRouter } from 'react-router-dom'
import { Offline } from 'react-detect-offline'
import { Alert} from 'antd'

//BrowserRouter as Router, Route, Routes ,
// import { Fragment } from 'react'
import Router from '../routes'
import PageHeader from '../PageHeader/PageHeader'
//import * as pages from '../Pages/index'

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

  // return (
  //   <Router className={classes['page']} >
  //     <Offline>
  //       <Alert className={classes['alert']}  showIcon message='Кажется, у вас нет интернета. Проверьте сетевое соединение' type="error" />
  //     </Offline>
  //     <PageHeader />
  //     <Routes>
  //       <Route path="/" Component={ArticlesList} />
  //       <Route path="/:paginate" Component={ArticlesList} />
  //       <Route path="/articles"  Component={ArticlesList} />
  //       <Route path="/articles/:slug" Component={ArticlePage} />
  //       <Route path="/articles/:slug/edit" Component={CreateArticlePage} />
  //       <Route path="/sign-up" Component={SignUp} />
  //       <Route path="/sign-in"  Component={SignIn} />
  //       <Route path="/profile" Component={EditProfile} />
  //       <Route path="/new-article" Component={CreateArticlePage} />
  //     </Routes>
  //   </Router>
  // )
}

export default App


//<RequireAuth>
//import RequireAuth from './hoc/RequireAuth';

// import { useLocation, Navigate } from 'react-router-dom';

// import React from 'react';
// import { useSelector } from 'react-redux';

// // eslint-disable-next-line react/prop-types
// const RequireAuth = ({ children }) => {
//   const location = useLocation();
//   const auth = useSelector((state) => state.user.email);
//   if (!auth) {
//     return <Navigate to="/sign-in" state={{ from: location }} />;
//   }
//   return children;
// };

// export default RequireAuth;