import React from 'react'
import { Route, Switch } from 'react-router'
import Login from './screens/Login/Index'

const app = () => {
  return (
    <>
      <Switch>
        <Route path='/' component={Login} exact/>
      </Switch>
    </>
  )
}

export default app
