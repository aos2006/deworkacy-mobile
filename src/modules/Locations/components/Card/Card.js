
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Card.scss';
import Title from 'components/Title';
import Para from 'components/Para';
import Arrow from './icons/arrow.svg';
import Button from 'components/Button';
import Link from 'components/Link';

const Card = props => (
  <article className={cx([
    s.root,
    {
      [s.show]: props.show,
    }
  ])}>
    <header className={s.header}>
      <Title black classes={{ root: s.title }}>
        {props.title}
      </Title>
      <Arrow className={s.arrow} onClick={props.handleClose} />
    </header>
    <Para className={s.address} medium black>
      {props.address}
    </Para>
    <Para large className={s.descr} black>
      {props.txt}
    </Para>
    <div className={s.button}>
      <Button fullWidth medium>
        Оставить заявку
      </Button>
    </div>
    <div className={s.link}>
      <Link href={props.presentation}>
        Скачать презентацию
      </Link>
    </div>
  </article>
);

export default withStyles(s)(Card)
