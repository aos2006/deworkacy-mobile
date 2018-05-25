import React, { PureComponent } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.scss';
import Title from 'components/Title';
import Container from 'components/Container';
import Slider from 'components/Slider';
import Sectionheader from 'components/SectionHeader';

class Reviews extends PureComponent {

  render() {
    return (
      <article className={cx([s.root])}>
        <Container>
          <div className={s.row}>
            <Sectionheader
              title="О нас говорят"
              className={s.header}
            />
            <Slider
              dotsClass={s.dots}
              className={s.slider}
              settings={{
                infinite: true,
                customDots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
            }}>
              {this.props.list.map((item, index) => (
                <div className={s.comment} key={item.id}>
                 <p className={s.txt}>{item.reviewText}</p>
                  <footer className={s.footer}>
                    <img src={item.image.photo75} alt="" className={s.man} />
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
        </Container>
      </article>
    )
  }
}

export default withStyles(s)(Reviews);
