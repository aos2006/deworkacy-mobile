
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CardGrid.css';
import Card from 'components/Card';

const CardGrid = ({
  list,
                  }) => (
  <div className={s.root}>
    {list.map(item => (
      <div className={s.item}>
        <Card
          {...item}
        />
      </div>
    ))}
  </div>
);

export default withStyles(s)(CardGrid)
