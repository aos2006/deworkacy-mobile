import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Tags.css';

const Tags = ({ tags }) => (
  <ul className={s.root}>
    {tags.map(item => <li className={s.tag}>{item.txt}</li>)}
  </ul>
);

Tags.defaultProps = {
  tags: [
    { txt: 'Contemporary' },
    { txt: 'Classic' },
    { txt: 'Decor' },
    { txt: 'Minimal' },
    { txt: 'Essentials' },
    { txt: 'Lighting' },
    { txt: 'Kitchen' },
    { txt: 'Prectical' },
  ],
};

export default withStyles(s)(Tags);
