import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from './utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
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

// static propTypes = {
//   location: T.object,
//   auth: T.instanceOf(AuthService)
// }
// static contextTypes = {
//   router: T.object
// }

export default Login;
