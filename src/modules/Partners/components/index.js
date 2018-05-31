import React, { PureComponent } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Partners.scss';
import Container from 'components/Container';
import Slider from 'components/Slider';
import SectionHeader from 'components/SectionHeader';
import globalS from './globalStyles/index.scss';

class Partners extends PureComponent {
  render() {
    return (
      <article
        className={cx([s.root, 'section'])}
      >
        <Container>
          <div className={s.row}>
            <SectionHeader
              title="Нам доверяют"
              className={s.header} />
            <Slider
              dotsClass={s.dots}
              className={cx(
                s.slider,
                'partners-slider',
              )}
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
                      <object data={item.image} className={s.object} type="image/svg+xml" width={100}
                              height={item.height}/>
                      {/*<a href="">*/}
                       {/**/}
                      {/*</a>*/}
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

export default withStyles(s, globalS)(Partners);
