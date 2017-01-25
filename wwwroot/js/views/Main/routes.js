import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import DashBoard from '.../components/dashboard/DashBoard'
import Login from './Login/Login'
import Nav from './main'

const auth = new AuthService('NcmAxhIO0VesNQAwx4hYhQSE7ZiFhNHt', 'azi.auth0.com');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="plants/dashboard" />
      <Route path="dashboard" component={DashBoard} onEnter={requireAuth} />
      <Route path="login" component={Login} auth={auth} />
    </Route>
  )
}

export default makeMainRoutes
