import React from 'react'
import { Route, Switch } from 'react-router'
import Login from './screens/Login/Index'
import Subject from './screens/Subject/Index'

const app = () => {
  return (
    <>
      <Switch>
        <Route path='/' component={Login} exact/>
        <Route path='/subject' component={Subject}/>
      </Switch>
    </>
  )
}

export default app
