import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Partners.scss';
import Container from 'components/Container';
import Slider from 'components/Slider';
import SectionHeader from 'components/SectionHeader';
import globalS from './globalStyles/index.scss';
import SectionDevider from 'components/SectionDevider';
import LazyImg from 'components/LazyImg';
import LazyLoad from 'react-lazyload';

class Partners extends Component {
  state = {
    currentSlide: 1,
  };

  settings = {
    infinite: true,
    customDots: true,
    slidesToShow: 1,
    speed: 500,
    rows: 4,
    slidesPerRow: 2,
    afterChange: i =>
      this.setState({
        currentSlide: i + 1,
      }),
  };

  inRange = (index, min, max) => index >= min && index <= max;

  render() {
    console.log(this.state.currentSlide);
    return (
      <article className={cx([s.root, 'section', 'section-auto-height'])}>
        <LazyLoad once offset={500} height="606px">
          <Container>
            <div className={s.row}>
              <SectionHeader title="Нам доверяют" className={s.header}/>
              <Slider
                dotsClass={s.dots}
                className={cx(s.slider, 'partners-slider')}
                settings={this.settings}
              >
                {this.props.list.map((item, index) => (
                  <div className={s.companyWrapper} key={item.id || index}>
                    <div className={s.company}>
                      <a href={item.href} target="_blank">
                        <LazyImg
                          loaderClassName={s.loader}
                          dataSrc={item.image}
                          startLoad={this.inRange(
                            index + 1,
                            this.state.currentSlide,
                            this.state.currentSlide * 2 * 4,
                          )}
                          className={s.object}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Container>
        </LazyLoad>
        <SectionDevider className={s.devider} />
      </article>
    );
  }
}

export default withStyles(s, globalS)(Partners);
