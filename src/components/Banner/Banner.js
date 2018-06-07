
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Banner.scss';
import Slider from 'components/Slider';
import Title from 'components/Title';
import Para from 'components/Para';
import Button from 'components/Button';
import Container from 'components/Container';
import LazyImg from 'components/LazyImg';
import globalS from './globalStyles/index.scss';

class Banner extends PureComponent {
  state = {
    currentSlide: 0,
  }

  render() {
    return (
      <div
        className={cx([
          s.root,
          'section',
          'app-banner',
          'normal-scroll',
        ])}>
        <Slider
          settings={{
            className: s.slide,
            afterChange: (i) => this.setState({
              currentSlide: i,
            })
          }}
          className={cx([
            s.slider,
            'banner-slider',
          ])}
          dotsClass={s.dots}
        >
          {this.props.list.map((item, i) => (
            <div className={s.content} key={item.id}>
              <LazyImg
                className={s.img}
                root={{
                  style: {
                    'height': '100%'
                  }
                }}
                dataSrc={item.image.photo320}
                startLoad={i === this.state.currentSlide}
              />
              <div className={s.inner}>
                <Container className={cx([
                  s.container,
                  'banner-content',
                ])}>
                  <Title type="h1" classes={{root: s.title}}>
                    {item.title}
                  </Title>
                  <Para className={s.para}>
                    {item.text}
                  </Para>
                  <Button
                    onClick={this.props.handleGoTo}
                    classes={{root: s.button}} fullWidth>
                    {item.buttonText}
                  </Button>
                </Container>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}
Banner.defaultProps = {
  list: [],
}
export default withStyles(globalS, s)(Banner)
