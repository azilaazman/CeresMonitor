import React, { PropTypes as T } from 'react'
import { Jumbotron } from 'react-bootstrap'
// import styles from './styles.module.css'

export class Container extends React.Component {

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <div>
        {children}
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

// static contextTypes = {
//   router: T.object
// }

export default Container;
