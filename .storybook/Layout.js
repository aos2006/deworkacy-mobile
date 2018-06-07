import React, { Component, PropTypes } from 'react';
import s from 'src/components/Layout/Layout.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Layout extends Component {

  render() {
    return (
      <div
        style={{
        padding: '30px',
        backgroundColor: 'gray',
        maxWidth: '1170px'
      }}>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(s)(Layout);
