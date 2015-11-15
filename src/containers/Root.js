
import React, {Component, PropTypes} from 'react'
import Radium from 'radium'


class Root extends Component {

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    )
  }

}


export default Radium(Root)