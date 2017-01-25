'use strict';

import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from './utils/AuthService'
// import styles from './styles.module.css'

export class Login extends React.Component {
  render() {
    const { auth } = this.props
    return (
     
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="login-panel panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Please Sign In</h3>
            </div>
            <div className="panel-body">
              <form role="form">
                <img src="http://oi66.tinypic.com/riepdv.jpg" className="img-responsive" alt="CERES Logo" style={{margin: '0 auto'}} />
                <fieldset>
                  {/* Change this to a button or input when using this as a form */}
                  <ButtonToolbar>
                  <Button onClick={auth.login.bind(this)} className="btn btn-lg btn-success btn-block"><i className="fa fa-sign-in" aria-hidden="true" />Login</Button>
                  </ButtonToolbar>               
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: T.object
}
Login.PropTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
}


export default Login;
