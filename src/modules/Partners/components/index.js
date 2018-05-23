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
      <article className={cx([s.root])}>
        <Container>
          <div className={s.row}>
            <SectionHeader title="Нам доверяют" className={s.header} />
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
              {[1, 2, 4, 5, 6, 7, 8, 7, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map(
                (item, index) => (
                  <div className={s.companyWrapper} key={index}>
                    <div className={s.company}>
                      <a href="">
                        <Alpha />
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
