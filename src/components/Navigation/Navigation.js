/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.PureComponent {
  render() {
    const { theme, classes } = this.props;
    return (
      <div className={cx([
        s.root,
        s[theme],
        classes.root,
      ])} role="navigation">
        {this.props.list.map(item => (
          <Link className={s.link} to={item.to} activeClassName={s.activeLink}>
            {item.txt}
          </Link>
        ))}
      </div>
    );
  }
}

Navigation.defaultProps = {
  theme: '',
  classes: { root: '' },
  list: [
    { txt: 'Home', to: '/' },
    { txt: 'Shop', to: '/shop' },
    { txt: 'About', to: '/about' },
    { txt: 'Blog', to: '/blog' },
    { txt: 'Personal', to: '/personal' },
  ]
}

export default withStyles(s)(Navigation);
