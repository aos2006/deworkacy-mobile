
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Phone.css';
import Icon from './icons/phone.svg';

const Phone = props => (
  <a {...props} className={cx([
    s.root,
    s.phone,
    props.className,
  ])}>
    <Icon />
  </a>
);

export default withStyles(s)(Phone)
