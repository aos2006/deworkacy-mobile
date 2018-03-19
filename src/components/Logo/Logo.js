
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Logo.css';

const Logo = ({
  classes,
  theme,
              }) => (
  <div className={cx([
    s.root,
    s[theme],
    classes.root,
  ])}>
    Shippon
  </div>
);


Logo.defaultProps = {
  theme: '',
  classes: { root: '' },
};

export default withStyles(s)(Logo)
