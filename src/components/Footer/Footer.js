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
import ServiceFeatures from 'components/ServiceFeatures';
import Container from 'components/Container';
import Logo from 'components/Logo';
import Navigation from 'components/Navigation';
import SocialsList from 'components/SocialsList';
import s from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Container>
          <ServiceFeatures classes={{ root: s.services }} />
          <Logo theme="white" classes={{ root: s.logo }} />
          <p className={s.descr}>
            A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it
            there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded
            frame.
          </p>
          <SocialsList
            type="circle"
            center
            classes={{root: s.socials}}
          />
          <Navigation theme="white" classes={{ root: s.navigation }} />
          <p className={s.terms}>
            © 2017 Shippon.All rights reserved.
          </p>
        </Container>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
