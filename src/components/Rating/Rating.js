import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FontAwesome from 'react-fontawesome';
import cx from 'classnames';
import s from './Rating.css';

const Rating = ({ list, classes }) => (
  <div className={cx([
    s.root,
    classes.root,
  ])}>
    {list.map(item => (
      <FontAwesome className={s.star} name={item.name} />
    ))}
  </div>
);

Rating.defaultProps = {
  classes: { root: '' },
  list: [
    { name: 'star' },
    { name: 'star' },
    { name: 'star' },
    { name: 'star' },
    { name: 'star-half-o' },
  ],
};

export default withStyles(s)(Rating);
