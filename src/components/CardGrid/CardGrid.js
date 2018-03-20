import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CardGrid.css';
import Card from 'components/Card';

const CardGrid = ({ list, gridCount }) => (
  <div
    className={cx([
      s.root,
      {
        [s[gridCount]]: true,
      }
    ])}
  >
    {list.map(item => (
      <div className={s.item}>
        <Card {...item} />
      </div>
    ))}
  </div>
);

CardGrid.defaultProps = {};

export default withStyles(s)(CardGrid);
