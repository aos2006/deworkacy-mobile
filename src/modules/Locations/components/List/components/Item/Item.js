
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Item.scss';
import Title from 'components/Title';
import Para from 'components/Para';
import InfoIcon from './info.svg';

const Item = props => (
  <article className={cx(
    s.root,
    {
      [s.active]: props.isActive,
    }
  )}>
    <header className={s.header}>
      <p className={s.count}>
        <span>{`0${props.from}`}/{`0${props.to}`}</span>
        <InfoIcon className={s.info} />
      </p>
    </header>
    <Title type="h2" classes={{ root: s.title }}>
      {props.title}
    </Title>
    <Para className={s.para}>
      {props.addr}
    </Para>
  </article>
);

Item.defaultProps = {
  from: 0,
  to: 3,
}

export default withStyles(s)(Item);
