
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


const ServicesList = props => (
  <div className={cx([
    s.root,
    'section',
  ])}>
    <article className={s.inner}>
      <Container className={s.wrapper}>
        <div className={cx([
          s.itemRoot,
        ])} key={props.id}>
          <SectionHeader title="Услуги" className={s.sectionHeader} />
          {props.icon}
          <div className={s.row}>
            <section className={s.info}>
              <Title type="h1" classes={{root: s.sectionTitle}}>
                {props.title}
              </Title>
              <Para className={s.para}>
                {props.descr}
              </Para>
            </section>
            {/*<div className={s.picture}>*/}
            {/*<img src="https://loremflickr.com/84/136" alt=""/>*/}
            {/*</div>*/}
          </div>
          <div className={s.fullWidth}>
            <Button
              classes={{root: s.button}}
              href="#order"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </Container>
    </article>
  </div>
);
const items = [
  {
    id: 1,
    icon: <Peoples className={cx([
      s.icon,
      s.peoples,
      'services-list__icon'
    ])}/>,
    title: 'Организация мероприятий',
    descr: 'Сеть деловых пространств Deworkacy предлагает ряд разнообразных локаций под мероприятия. Наша команда\n' +
    '              поможет организовать мероприятие любого формата от бизнес-завтраков и тренингов до хакатонов и\n' +
    '              конференций.',
  },
  {
    id: 88,
    icon: <Spaces className={cx([
      s.icon,
      s.spaces,
      'services-list__icon',
    ])}/>,
    title: 'Рабочие пространства',
    descr: 'Deworkacy – это среда, где процветает бизнес. Индивидуально спроектированные рабочие пространства в престижных локациях, которые помогут вашей команде думать о главном - развитии вашего бизнеса, об остальном позаботимся мы.',
  },
  {
    id: 109,
    icon: <Corporate className={cx([
      s.icon,
      s.corporate,
      'services-list__icon',
    ])}/>,
    title: 'Корпоративные продукты',
    descr: 'Мы проектируем комплексные решения для мобилизации технологического потенциала корпораций. Мы умеем\n' +
    'и любим помогать нашим клиентам решать самые сложные задачи и предлагаем только самые эффективные инструменты.',
  }
];

const Component = withStyles(globalS, s)(ServicesList);
const List = (props) => items.map(item => <Component {...item} />)
export default List;


