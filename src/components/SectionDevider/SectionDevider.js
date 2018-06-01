
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SectionDevider.scss';

const SectionDevider = props => (
  <div className={cx([
    s.root,
    props.className,
    {
      [s.full]: props.full,
    }
  ])} />
);

export default withStyles(s)(SectionDevider)
