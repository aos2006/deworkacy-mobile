
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Logo.css';
import Dwy from './dwy.svg';

const Logo = props => (
  <div
    {...props.dataAttrs}
    className={cx([
    s.root,
    props.className,
  ])}>
    <Dwy />
  </div>
);

export default withStyles(s)(Logo)
