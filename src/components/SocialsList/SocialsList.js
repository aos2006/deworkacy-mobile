import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SocialsList.css';

const SocialsList = ({ list, classes, center, type }) => (
  <ul className={cx(s.root, { [s.center]: center }, classes.root)}>
    {list.map(item => (
      <li className={cx([
        s.item,
        {
          [s[type]]: true,
        }
      ])}>
        <a href={item.href} target="_blank">
          <FontAwesome name={item.icon} className={s.icon} />
        </a>
      </li>
    ))}
  </ul>
);

SocialsList.defaultProps = {
  center: false,
  type: '',
  classes: { root: '' },
  list: [{ icon: 'facebook-f' }, { icon: 'twitter' }],
};

export default withStyles(s)(SocialsList);
