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
import SectionHeader from 'components/SectionHeader';
import globalS from './globalStyles/global.scss';
import bg from './images/events-bg.jpg';

const ServicesList = props => (
  <div className={cx([s.root, 'section'])}>
    <article className={s.inner}>
      <div>
        <div className={cx([s.itemRoot])} key={props.id}>
          <div className={s.bg}>
            <img src={props.src} alt="" />
          </div>
          <Container className={s.wrapper}>
            <SectionHeader title="Услуги" className={s.sectionHeader} />
            {props.icon}
            <div className={s.row}>
              <section className={cx([s.info, 'services_para'])}>
                <Title type="h1" classes={{ root: s.sectionTitle }}>
                  {props.title}
                </Title>
                <Para className={s.para}>{props.descr}</Para>
              </section>
            </div>
            <div className={cx(s.fullWidth, 'services_button')}>
              <Button classes={{ root: s.button }} onClick={props.handleGoTo}>
                Оставить заявку
              </Button>
            </div>
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
const List = props =>
  props.list.map((item, index) => (
    <Component
      handleGoTo={props.handleGoTo}
      icon={items[index].icon}
      title={item.title}
      descr={item.text}
      src={item.image.photo640}
    />
  ));
export default List;
