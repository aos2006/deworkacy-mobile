/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Link.scss';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: null,
  };

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const { to, children, ...props } = this.props;
    return (
      <a href={to} {...props} onClick={this.handleClick} className={cx([
          s.root,
        props.className,
        {
          // [props.activeClassName]: to === this.context.pathname || to === history.location.pathname,
        }
      ])}>
        {children}
      </a>
    );
  }
}

Link.defaultProps = {
  activeClassName: '',
}

Link.contextTypes = {
  pathname: PropTypes.string,
};

export default withStyles(s)(Link);
