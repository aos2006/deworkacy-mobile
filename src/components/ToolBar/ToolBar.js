
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ToolBar.css';
import FontAwesome from 'react-fontawesome';

const ToolBar = props => (
  <div className={s.root}>
    <FontAwesome
      name="search"
      className={s.action}
    />
   <span className={s.bag}>
     <span className={s.count}>
       2
     </span>
      <FontAwesome
        name="shopping-bag"
        className={s.action}
      />
   </span>
  </div>
);

export default withStyles(s)(ToolBar)
