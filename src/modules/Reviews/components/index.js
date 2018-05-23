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
              {[1,1,1,1].map((item, index) => (
                <div className={s.comment} key={index}>
                 <p className={s.txt}>
                   Мы очень довольны организацией мероприятия. Качество и разнообразие еды были оценены нашими клиентами
                   на 5ку.
                   Сейчас мы составляем календарь наших мероприятий на ближайшие полгода, как только определимся с
                   ближайшими мероприятиями - прийдем к вам с обсуждением).
                 </p>
                  <footer className={s.footer}>
                    <img src="https://loremflickr.com/66/66" alt="" className={s.man} />
                    <div className={s.commentInner}>
                      <Title type="h4">
                        Константинопольская
                        Ирина
                      </Title>
                      <span className={s.company}>
                        AllContainerLines
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
