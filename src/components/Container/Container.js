
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Container.css';

const Container = props => (
  <div className={cx(
    [
      s.root,
      props.className,
    ]
  )}>
    {props.children}
  </div>
);

export default withStyles(s)(Container);
