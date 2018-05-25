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


class Layout extends React.Component {
  state = {
    isLoaded: false,
  }
  componentDidMount() {
    $('#page').fullpage({
      touchSensitivity: 5,
      paddingTop: '0',
      paddingBottom: '0',
      anchors: ["banner", "services-0", "services-1", "services-2", "locations", "partners", "reviews", "calendar", "order", "footer"],
      afterLoad: (anchorLink) => {
        if (anchorLink == 'banner') {
          this.setState({
            isLoaded: true,
          })
        }
      }
    })
  }
  render() {

    return (
      <div>
        <Loader hide={this.state.isLoaded} />
        {this.props.noHeader || <Header/>}
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(baseAntdStyle, normalizeCss, notifyS, fontStyles, grid, globalS, s)(Layout);
