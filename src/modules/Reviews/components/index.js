import React, { PureComponent } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.scss';
import Title from 'components/Title';
import Container from 'components/Container';
import Slider from 'components/Slider';
import Sectionheader from 'components/SectionHeader';
import Button from 'components/Button';
import SectionDevider from 'components/SectionDevider';
import globalS from './globalStyles/index.scss';
import LazyImg from 'components/LazyImg';
import LazyLoad from 'react-lazyload';

class Reviews extends PureComponent {
  state = {
    currentSlide: 0,
  }

  sliderSettings = {
    infinite: true,
    customDots: true,
    slidesToShow: 1,
    swipeToSlide: true,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: true,
    afterChange: i => this.setState({
      currentSlide: i,
    })
  }
  render() {
    return (
      <article
        className={cx([s.root, 'section', 'section-auto-height'])}>
        <LazyLoad once offset={500} height="514px">
          <Container>
            <div className={s.row}>
              <Sectionheader
                title="О нас говорят"
                className={s.header}
              />
              <Slider
                dotsClass={s.dots}
                className={cx([
                  s.slider,
                  'reviews-slider',
                ])}
                settings={this.sliderSettings}>
                {this.props.list.map((item, index) => (
                  <div className={s.comment} key={item.id}>
                    <p className={s.txt}>{item.reviewText}</p>
                    <footer className={s.footer}>
                      <LazyImg
                        dataSrc={item.image.photo75}
                        className={s.man}
                        startLoad={this.state.currentSlide === index}
                      />
                      <div className={s.commentInner}>
                        <Title type="h4">
                          {item.reviewerTitle}
                        </Title>
                        <span className={s.company}>
                        {item.companyTitle}
                      </span>
                      </div>
                    </footer>
                  </div>
                ))}
              </Slider>
            </div>
            <Button fullWidth classes={{root: s.button}} onClick={this.props.handleGoTo}>
              Оставить заявку
            </Button>
            <SectionDevider/>
          </Container>
        </LazyLoad>
      </article>
    )
  }
}

export default withStyles(s, globalS)(Reviews);
