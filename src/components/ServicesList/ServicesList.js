import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ServicesList.scss';
import Container from 'components/Container';
import Title from 'components/Title';
import Para from 'components/Para';
import Button from 'components/Button';
import Peoples from './icons/peoples.svg';
import Spaces from './icons/spaces.svg';
import Corporate from './icons/corporate.svg';
import globalS from './globalStyles/global.scss';
import SectionDevider from 'components/SectionDevider';

const ServicesList = props => (
  <div className={cx([s.root, 'section', 'section-auto-height'])}>
    <article className={s.inner}>
      <div>
        <div className={cx([s.itemRoot])} key={props.id}>
          <div className={cx([s.bg])}>
            <img src={props.src} alt=""/>
          </div>
          <Container className={s.wrapper}>
            <div className={s.iconWrapper}>{props.icon}</div>
            <div className={s.row}>
              <section className={cx([s.info, 'services_para'])}>
                <Title type="h5" classes={{ root: s.pretitle }}>
                  Услуги
                </Title>
                <Title type="h1" classes={{ root: s.sectionTitle }}>
                  {props.title}
                </Title>
                <Para className={s.para}>{props.descr}</Para>
              </section>
            </div>
            <Button classes={{ root: s.button }} onClick={props.handleGoTo}>
              Оставить заявку
            </Button>
          </Container>
        </div>
      </div>
    </article>
  </div>
);
const items = [
  {
    icon: <Peoples className={cx([s.icon, s.peoples, 'services_icon'])} />,
  },
  {
    icon: <Spaces className={cx([s.icon, s.spaces, 'services_icon'])} />,
  },
  {
    id: 109,
    icon: <Corporate className={cx([s.icon, s.corporate, 'services_icon'])} />,
  },
];

const Component = withStyles(globalS, s)(ServicesList);

class List extends React.PureComponent {

  componentDidMount() {
    // $(document).on('scroll', ev => {
    //   const elem = $('.services-list .active');
    //   if (elem.length > 0) {
    //     const el = $('.services-list').offset();
    //     const offset = $(window).scrollTop() - el.top;
    //     $('.services-list-bg').css('top', offset > 0 ? offset : 0);
    //   }
    // });
  }

  render() {
    return (
      <div>
        {this.props.list.map((item, index) => (
          <Component
            handleGoTo={this.props.handleGoTo}
            icon={items[index].icon}
            title={item.title}
            descr={item.text}
            src={item.image.photo320}
          />
        ))}
        <SectionDevider />
      </div>
    );
  }
}

export default List;
