
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Event.scss';
import Title from 'components/Title';

const Event = props => (
  <article className={cx([
    s.root,
    props.className,
  ])}>
    <header className={s.header}>
      <h5 className={s.now}>
        Сегодня
      </h5>
    </header>
    {/*<div className={s.img}>*/}
      {/*<img src={props.img} alt="" />*/}
    {/*</div>*/}
    <Title type="h4" classes={{ root: s.title }}>
      {props.title}
    </Title>
    <footer className={s.footer}>
      <span className={s.place}>
        {props.place}
      </span>
      <span className={s.date}>
        {`${props.range} | ${props.time}`}
      </span>
    </footer>
  </article>
);

export default withStyles(s)(Event)
