
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Stock from './icons/stock.svg';
import cx from 'classnames';
import s from './CardLabel.css';

const CardLabel = ({
  type,
  txt,
  children,
                   }) => (
  <div className={cx([
    s.root,
    {
      [s[type]]: true,
    }
  ])}>
    {children}
  </div>
);

CardLabel.defaultProps = {
  txt: 'sale',
  type: PropTypes.oneOf(['tape', 'circle']),
};

export default withStyles(s)(CardLabel);
