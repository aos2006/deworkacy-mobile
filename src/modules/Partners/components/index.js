import React, { PureComponent } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Partners.scss';
import Title from 'components/Title';
import Container from 'components/Container';
import Slider from 'components/Slider';
import Alpha from './icons/alpha.svg';
import SectionHeader from 'components/SectionHeader';

class Partners extends PureComponent {
  render() {
    return (
      <article
        data-top="opacity: 1;"
        data-200-top="opacity: 0;"
        data--106-top="opacity: 0"
        data--50-top="opacity: 1"
        className={cx([s.root])}
      >
        <Container>
          <div className={s.row}>
            <SectionHeader
              dataAttrs={{
                'data-80-top': 'opacity: 0',
                'data-30-top': 'opacity: 1',
              }}
              title="Нам доверяют"
              className={s.header} />
            <Slider
              dotsClass={s.dots}
              className={s.slider}
              settings={{
                infinite: true,
                customDots: true,
                slidesToShow: 1,
                speed: 500,
                rows: 4,
                slidesPerRow: 2,
              }}
            >
              {this.props.list.map(
                (item, index) => (
                  <div className={s.companyWrapper} key={item.id || index}>
                    <div className={s.company}>
                      <a href="">
                        <img src={item.image.photo75} alt="" />
                      </a>
                    </div>
                  </div>
                ),
              )}
            </Slider>
          </div>
        </Container>
      </article>
    );
  }
}

export default withStyles(s)(Partners);
