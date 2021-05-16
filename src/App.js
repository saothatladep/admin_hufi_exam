import React from 'react'
import { Route, Switch } from 'react-router'
import Login from './screens/Login/Index'
import Subject from './screens/Subject/Index'
import Chapter from './screens/Chapter/Index'
import User from './screens/User/Index'
import Question from './screens/Question/Index'

const app = () => {
  return (
    <>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/subject' component={Subject} />
        <Route path='/chapter' component={Chapter} />
        <Route path='/user' component={User} />
        <Route path='/question' component={Question} />
      </Switch>
    </>
  )
}

export default app
