
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Loader.scss';
import { Spin, Icon  } from 'antd';
const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

const Loader = props => (
  <div className={cx([
    s.root,
    {
      [s.hide]: props.hide,
    },
    props.className,
  ])}>
    <Spin indicator={antIcon} />
  </div>
);

export default withStyles(s)(Loader)
