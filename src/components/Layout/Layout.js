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
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import fontStyles from './fonts/stylesheet.css';
import grid from '../../styles/grid.scss';
import s from './Layout.css';
import Header from '../Header';
import notifyS from 'antd/lib/notification/style/index.css';
import baseAntdStyle from 'antd/lib/style/index.css';
import globalS from './globalStyles/global.scss';
import Loader from 'components/Loader';
import Footer from 'components/Footer';

class Layout extends React.Component {
  state = {
    isLoaded: true,
    moveTo: null,
  };

  componentDidMount() {
    $('#page').fullpage({
      touchSensitivity: 25,
      paddingTop: '0',
      paddingBottom: '0',
      autoScrolling: false,
      fitToSection: false,
      loopTop: false,
      easingcss3: 'ease-in-out',
      fitToSectionDelay: 200,
      bigSectionsDestination: 'bottom',
      loopHorizontal: true,
      scrollingSpeed: 400,
      normalScrollElements: '.normal-scroll',
      responsiveHeight: 900,
      scrollOverflowOptions: {
        eventPassthrough: 'horizontal',
      },
      verticalCentered: false,
      recordHistory: true,
    });

    let xStart, yStart = 0;

    document.addEventListener('touchstart', function (e) {
      xStart = e.touches[0].screenX;
      yStart = e.touches[0].screenY;
    }), {passive: false};

    document.addEventListener('touchmove', function (e) {
      var xMovement = Math.abs(e.touches[0].screenX - xStart);
      var yMovement = Math.abs(e.touches[0].screenY - yStart);
      if ((xMovement * 3) > yMovement) {
        e.preventDefault();
      }
    }, {passive: false});

  }
  render() {
    return (
      <div>
        <Loader hide={this.state.isLoaded} />
       <div id="page" className={s.page}>
         {this.props.noHeader || <Header/>}
         {React.Children.map(this.props.children, child => (
           React.cloneElement(child, { moveTo: (...args) => $.fn.fullpage.moveTo(...args) })
         ))}
       </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(
  baseAntdStyle,
  normalizeCss,
  notifyS,
  fontStyles,
  grid,
  globalS,
  s,
)(Layout);
