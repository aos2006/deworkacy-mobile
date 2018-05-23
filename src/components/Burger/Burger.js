
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Burger.scss';
import Icon from './icons/burger.svg';

const Burger = props => (
  <button className={cx([
    s.root,
    props.className,
  ])}>
    <Icon />
  </button>
);

Burger.defaultProps = {
  classes: { root: '' },
};

export default withStyles(s)(Burger);
