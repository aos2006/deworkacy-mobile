
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Banner.scss';
import Slider from 'components/Slider';
import Title from 'components/Title';
import Para from 'components/Para';
import Button from 'components/Button';
import Container from 'components/Container';

const Banner = props => (
  <div className={cx([
    s.root,
  ])}>
    <Slider
      className={s.slider}
      dotsClass={s.dots}
    >
      {[
        {
          id: 1,
          title: '',
          descr: '',
          img: 'https://loremflickr.com/320/565'
        },
        {
          id: 2,
          title: '',
          descr: '',
          img: 'https://loremflickr.com/320/565',
        }
      ].map(item => (
        <div className={s.content} key={item.id}>
          <img src={item.img} alt="" className={s.img} />
          <div className={s.inner}>
            <Container className={s.container}>
              <Title type="h1" classes={{ root: s.title }}>
                Делайте бизнес комфортно
              </Title>
              <Para className={s.para}>
                Ваши рабочие пространста
                в престижных локациях Москвы
                со всем необходимым для развития стартапа
              </Para>
              <Button classes={{ root: s.button }}>
                Оставьте заявку
              </Button>
            </Container>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);

export default withStyles(s)(Banner)
