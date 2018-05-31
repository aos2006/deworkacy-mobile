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

  scrollToOrder = () => {
    this.props.moveTo(9);
  }

  render() {
    return (
      <div>
        <div className={s.root}>
          <Banner
            handleGoTo={this.scrollToOrder}
            list={this.props.banner.screens}
          />
          <ServicesList
            handleGoTo={this.scrollToOrder}
            list={this.props.services.objects}
          />
          <Locations
            locations={this.props.locations}
          />
          <Partners
            list={this.props.partners.objects}
          />
          <Reviews
            list={this.props.reviews.objects}
          />
          <div className="section">
            <Calendar/>
          </div>
          <div className="section">
            <Simple/>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(fullPageS, s)(Home);
