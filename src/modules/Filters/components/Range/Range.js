import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Range } from 'rc-slider';
import rangeS from 'rc-slider/assets/index.css';
import Button from 'components/Button';
import s from './Range.css';

const R = ({
  from,
  to,
           }) => (
  <div className={s.root}>
    <p className={s.label}>
      Price {from} - {to}
    </p>
    <Range
      className={s.range}
      handleStyle={[
        {
          backgroundColor: 'black',
          borderColor: 'black',
        },
        {
          backgroundColor: 'black',
          borderColor: 'black',
        },
      ]}
      trackStyle={[
        {
          backgroundColor: 'black',
          height: '3px',
        },
      ]}
      min={0}
      max={5000}
    />
    <Button
      theme="black"
    >
      Filter
    </Button>
  </div>
);

R.defaultProps = {
  to: 10,
  from: 0,
};
export default withStyles(s, rangeS)(R);
