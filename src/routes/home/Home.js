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
import { Calendar } from 'modules/Calendar';
import Footer from 'components/Footer';

class Home extends React.Component {
  render() {
    return (
      <div className={s.root} id="page">
        <div className="section" data-anchor="banner">
          <Banner
            list={this.props.banner.screens}
          />
        </div>
        <ServicesList
          list={this.props.services.objects}
        />
        <div className="section" data-anchor="locations">
          <Locations
            locations={this.props.locations}
          />
        </div>
        <div className='section' data-anchor="partners">
          <Partners
            list={this.props.partners.objects}
          />
        </div>
        <div className="section" data-anchor="reviews">
          <Reviews
            list={this.props.reviews.objects}
          />
        </div>
        <div className="section" data-anchor="calendar">
          <Calendar />
        </div>
        <div className="section" data-anchor="order">
          <Simple />
        </div>
        <div className="section" data-anchor="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(fullPageS, s)(Home);
