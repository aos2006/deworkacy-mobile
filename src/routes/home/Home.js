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
import fullPageS from 'fullpage.js/dist/jquery.fullpage.css';
import s from './Home.css';
import Banner from 'components/Banner';
import ServicesList from 'components/ServicesList';
import { Locations } from 'modules/Locations';
import { Partners } from 'modules/Partners';
import { Reviews } from 'modules/Reviews';
import { Simple } from 'modules/Form';
import Footer from 'components/Footer';

class Home extends React.Component {
  componentDidMount() {
    // console.log($.fullpage)
    // $('#page').fullpage();
  }
  render() {
    return (
      <div className={s.root} id="page">
        <div className="section">
          <Banner/>
        </div>
        <ServicesList />
        <div className="section">
          <Locations/>
        </div>
        <div className='section'>
          <Partners/>
        </div>
        <div className="section">
          <Reviews/>
        </div>
        <div className="section">
          <Simple/>
        </div>
        <div className="section">
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(fullPageS, s)(Home);
