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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Container from 'components/Container';
import Breadcrumbs from 'components/Breadcrumbs';
import s from './Products.css';


class Products extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <Breadcrumbs
          list={[
            { txt: 'Home', to: '/' },
            { txt: 'Shop', to: '/shop' }
          ]}
        />
       <Container>
         porducts
       </Container>
      </div>
    );
  }
}

export default withStyles(s)(Products);
