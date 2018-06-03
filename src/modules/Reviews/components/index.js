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

class Reviews extends PureComponent {
  sliderSettings = {
    infinite: true,
    customDots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: true,
  }
  render() {
    return (
      <article
        className={cx([s.root, 'section'])}>
        <Container>
          <div className={s.row}>
            <Sectionheader
              title="О нас говорят"
              className={s.header}
            />
            <Slider
              dotsClass={s.dots}
              className={s.slider}
              settings={this.sliderSettings}>
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
          <Button fullWidth classes={{ root: s.button }} onClick={this.props.handleGoTo}>
            Оставить заявку
          </Button>
          <SectionDevider />
        </Container>
      </article>
    )
  }
}

export default withStyles(s)(Reviews);
