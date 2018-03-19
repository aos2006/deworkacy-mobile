import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'components/Button';
import Rating from 'components/Rating';
import s from './Content.css';
import Container from 'components/Container';

const Content = ({
  title,
  price,
  buttonLabel,
                 }) => (
  <div className={s.root}>
    <Container>
      <h1 className={s.title}>{title}</h1>
      <div className={s.priceWrapper}>
        <span className={s.currency}>$</span>
        <span className={s.price}>{price}</span>
      </div>
      <Rating classes={{ root: s.rating }} />
      <Button>
        {buttonLabel}
      </Button>
    </Container>
  </div>
);

export default withStyles(s)(Content);
