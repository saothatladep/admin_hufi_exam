import React from 'react'
import { Route, Switch } from 'react-router'
import Login from './screens/Login/Index'
import Subject from './screens/Subject/Index'

const app = () => {
  return (
    <>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/subject' component={Subject} />
        <Route path='subject/search/:keyword' component={Subject} exact />
        <Route path='subject/page/:pageNumber' component={Subject} exact />
        <Route
          path='subject/search/:keyword/page/:pageNumber'
          component={Subject}
          exact
        />
      </Switch>
    </>
  )
}

export default app
