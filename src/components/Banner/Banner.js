import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Carousel from 'nuka-carousel';
import s from './Banner.css';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';

const Banner = props => (
  <div className={s.root}>
    <Carousel
      cellAlign="left"
      className={s.slider}
      renderBottomCenterControls={(props) => {
        const box = [];
        for(let i = 0; i < props.slideCount; i++) {
          box.push(
            <div
              onClick={() => props.goToSlide(i)}
              className={cx([
              s.dots,
              {
                [s.activeDot]: i === props.currentSlide,
              }
            ])} />
          )
        }
        return box;
      }}
      renderCenterLeftControls={({previousSlide}) => (
        <FontAwesome
          onClick={previousSlide}
          className={cx([
            s.arrow,
            s.arrowLeft,
          ])}
          size="2x"
          name="long-arrow-left"
        />
      )}
      renderCenterRightControls={({nextSlide}) => (
        <FontAwesome
          onClick={nextSlide}
          className={cx([
            s.arrow,
            s.arrowRight,
          ])}
          size="2x"
          name="long-arrow-right"
        />
      )}
    >
      {props.children}
    </Carousel>
  </div>
);

export default withStyles(s)(Banner);
