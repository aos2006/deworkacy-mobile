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
import Banner from 'components/Banner';
import Content from 'components/Banner/components/Content/Content';
import Container from 'components/Container';
import Tabs from 'components/Tabs';
import CardGrid from 'components/CardGrid';
import Jumbotron from 'components/Jumbotron';
import AccentProducts from 'components/AccentProducts';
import Button from 'components/Button';
import s from './Home.css';


class Home extends React.Component {
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
        <Banner>
          <Content
            title="Minimal Furniture Chair for Workspace"
            price="74.28"
            buttonLabel="Show Now"
          />
          <Content
            title="Minimal Furniture Chair for Workspace"
            price="74.28"
            buttonLabel="Show Now"
          />
          <Content
            title="Minimal Furniture Chair for Workspace"
            price="74.28"
            buttonLabel="Show Now"
          />
        </Banner>
        <AccentProducts
          classes={{ root: s.accentProducts }}
        />
       <Container>
         <Jumbotron classes={{
           root: s.jumbotron,
         }}
         />
         <header className={s.header}>
           <h1 className={s.title}>
             Trending Products
           </h1>
           <span className={s.devider} />
           <p className={s.descr}>
             A collection of textile samples lay spread out on the table Samsa was a travelled
           </p>
         </header>
         <Tabs
          classes={{
            header: s.tabsHeader,
            root: '',
          }}
          panels={[
            { render: () => (
                <CardGrid
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
                      labelTxt: 'Out\nof\nStock',
                      labelType: 'stock',
                    },
                    {
                      name: 'Aiaiai TMA-1 Studio',
                      brand: 'Headphones,Studio',
                      price: '$125',
                      labelTxt: 'New',
                      labelType: 'tape',
                    }
                  ]}
                />
              ) }
          ]}
         />
         <div className={s.loadMore}>
           <Button>
             Load More
           </Button>
         </div>
       </Container>
      </div>
    );
  }
}

export default withStyles(s)(Home);
