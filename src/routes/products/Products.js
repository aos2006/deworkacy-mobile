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
import SpecialProducts from 'components/SpecialProducts';
import Filters from 'modules/Filters/components';
import CardGrid from 'components/CardGrid';
import Select from 'components/Select';
import s from './Products.css';

class Products extends React.Component {


  render() {
    return (
      <div className={s.root}>
        <Breadcrumbs
          list={[{ txt: 'Home', to: '/' }, { txt: 'Shop', to: '/shop' }]}
        />
        <SpecialProducts
          classes={{
            root: s.specials,
          }}
        />
        <Container className={s.container}>
          <div className={s.filters}>
            <Filters />
          </div>
          <div className={s.grid}>
            <div className={s.sortingList}>
              <Select/>
            </div>
            <CardGrid
              gridCount="item-3"
              list={[
                {
                  name: 'Aiaiai TMA-1 Studio',
                  brand: 'Headphones,Studio',
                  price: '$125',
                  labelTxt: '-20%',
                  labelType: 'tape',
                },
                {
                  name: 'Aiaiai TMA-1 Studio',
                  brand: 'Headphones,Studio',
                  price: '$125',
                  labelTxt: '-20%',
                  labelType: 'tape',
                },
                {
                  name: 'Aiaiai TMA-1 Studio',
                  brand: 'Headphones,Studio',
                  price: '$125',
                  labelTxt: '-20%',
                  labelType: 'tape',
                },
                {
                  name: 'Aiaiai TMA-1 Studio',
                  brand: 'Headphones,Studio',
                  price: '$125',
                  labelTxt: '-20%',
                  labelType: 'tape',
                },
                {
                  name: 'Aiaiai TMA-1 Studio',
                  brand: 'Headphones,Studio',
                  price: '$125',
                  labelTxt: '-20%',
                  labelType: 'tape',
                },
                {
                  name: 'Aiaiai TMA-1 Studio',
                  brand: 'Headphones,Studio',
                  price: '$125',
                  labelTxt: 'Out of Stock',
                  labelType: 'stock',
                },
                {
                  name: 'Aiaiai TMA-1 Studio',
                  brand: 'Headphones,Studio',
                  price: '$125',
                  labelTxt: 'New',
                  labelType: 'tape',
                },
              ]}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(s)(Products);
