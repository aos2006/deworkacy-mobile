
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Tooltip.scss';

const CTooltip = props => (
  <div className={cx([
    s.root,
    props.className,
    {
      [s.visible]: props.visible,
    }
  ])}>
    <span className={s.tooltip}>
      {props.title}
    </span>
    {props.children}
  </div>
);

export default withStyles(s)(CTooltip);
