
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
  <div
    data-0="opacity: 1; transform: translateY(0)"
    data-200="opacity: 0;"
    className={cx([
    s.root,
  ])}>
    <Slider
      className={s.slider}
      dotsClass={s.dots}
    >
      {props.list.map(item => (
        <div className={s.content} key={item.id}>
          <img src={item.image || 'https://loremflickr.com/320/565'} alt="" className={s.img} />
          <div className={s.inner}>
            <Container className={s.container}>
              <Title type="h1" classes={{ root: s.title }}>
                {item.title}
              </Title>
              <Para className={s.para}>
                {item.text}
              </Para>
              <Button
                onClick={props.handleGoTo}
                classes={{ root: s.button }} fullWidth>
                {item.buttonText}
              </Button>
            </Container>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);
Banner.defaultProps = {
  list: [],
}
export default withStyles(s)(Banner)
