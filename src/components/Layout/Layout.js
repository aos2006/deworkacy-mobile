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
    isLoaded: false,
  };

  componentDidMount() {
    $('#page').fullpage({
      touchSensitivity: 10,
      paddingTop: '0',
      paddingBottom: '0',
      autoScrolling: false,
      fitToSection: false,
      scrollBar: true,
      easingcss3: 'ease-in-out',
      fitToSectionDelay: 200,
      scrollingSpeed: 400,
      normalScrollElements: '.normal-scroll',
      responsiveHeight: 900,
      afterRender: () => {
        this.setState({
          isLoaded: true,
        });
      },
      afterLoad(anchorLink, index) {
        const section = $('.section').eq(index - 1);
        const notViewed = !section.hasClass('section-viewed');
        if (notViewed) {
          section.addClass('section-viewed');
        }
      },
      verticalCentered: false,
    });

    let xStart,
      yStart = 0;

    document.addEventListener('touchstart', e => {
      xStart = e.touches[0].screenX;
      yStart = e.touches[0].screenY;
    }),
      { passive: false };

    document.addEventListener(
      'touchmove',
      e => {
        const xMovement = Math.abs(e.touches[0].screenX - xStart);
        const yMovement = Math.abs(e.touches[0].screenY - yStart);
        if (xMovement * 3 > yMovement) {
          e.preventDefault();
        }
      },
      { passive: false },
    );
  }
  render() {
    return (
      <div className={s.page}>
        <Loader hide={this.state.isLoaded} />
        <div id="page">
          {this.props.noHeader || <Header />}
          {this.props.children}
          <div className="section app-footer">
            <Footer />
          </div>
        </div>
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
