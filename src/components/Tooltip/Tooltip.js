
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Tooltip } from 'antd';
import tooltipS from 'antd/lib/tooltip/style/index.css';
import s from './Tooltip.scss';
import customAntd from './antdTheme/index.scss';

const CTooltip = props => (
  <Tooltip {...props} className={cx([
    'custom-tooltip',
    props.className,
  ])}>
    {props.children}
  </Tooltip>
);

export default withStyles(tooltipS, customAntd, s)(Tooltip);
