
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Card.scss';
import Title from 'components/Title';
import Para from 'components/Para';
import Close from './icons/close.svg';
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
      <Title classes={{ root: s.title }}>
        {props.title}
      </Title>
      <Close className={s.arrow} onClick={props.handleClose} width={24} height={24}/>
    </header>
    <Para className={s.address} medium>
      {props.address}
    </Para>
    <Para large className={s.descr}>
      {props.txt}
    </Para>
    <div className={s.button}>
      <Button fullWidth medium onClick={props.handleGoTo}>
        Оставить заявку
      </Button>
    </div>
    {props.presents.map(item => (
      <div className={s.link}>
        <Link href={item.href} target="_blank">
          {`${item.label}: Скачать презентацию`}
        </Link>
      </div>
    ))}
  </article>
);

export default withStyles(s)(Card)
