/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Burger from 'components/Burger';
import Phone from 'components/Phone';
import Logo from 'components/Logo';
import Container from 'components/Container';
import cx from 'classnames';
import Link from 'components/Link';

class Header extends React.Component {
  render() {
    return (
      <div
        className={cx([
        s.root,
        'app-header',
      ])}>
        <Container
          className={s.container}
        >
          <Link to="/" className={cx([
            s.logo,
            'app-logo',
          ])}>
            <Logo
            />
          </Link>
          <div
            className={cx([
            s.actions, 'app-header-actions'
          ])}>
            <a href="tel:+74951234535">
              <Phone className={s.phone}/>
            </a>
            <Burger className={s.burger} />
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(s)(Header);
