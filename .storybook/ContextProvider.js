import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContextProvider extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.object.isRequired
  };

  static contextTypes = {
    insertCss: PropTypes.func
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired
  };

  getChildContext() {
    return this.props.context;
  }

  render() {
    return this.props.children;
  }

}

export default ContextProvider;
