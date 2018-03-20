import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Colors.css';

const Colors = ({ colors }) => (
  <ul className={s.root}>
    {colors.map(item => (
      <li className={s.color}>
        <span
          className={s.circle}
          style={{
            backgroundColor: item.color,
          }}
        />
        <span className={s.label}>{item.label}</span>
      </li>
    ))}
  </ul>
);

Colors.defaultProps = {
  colors: [
    { color: 'black', label: 'Black' },
    { color: 'blue', label: 'Blue' },
    { color: 'brown', label: 'Brown' },
    { color: 'green', label: 'Green' },
  ],
};
export default withStyles(s)(Colors);
