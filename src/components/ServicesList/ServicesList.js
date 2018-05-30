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
  <div
    className={cx([s.root])}>
    <article className={s.inner}>
      <div>
        {props.list.map((item, index) => (
          <div
            data-start="opacity: 0"
            data--50-top="opacity: 0"
            data--20-top="opacity: 1"
            data-50-top="opacity: 1"
            className={cx([s.itemRoot])}
            key={props.id}>
            <img src={bg} alt="" className={s.bg} />
            <Container className={s.wrapper}>
              <SectionHeader
                dataAttrs={{
                  'data-80-top': 'opacity: 0',
                  'data-30-top': 'opacity: 1',
                }}
                title="Услуги"
                className={s.sectionHeader}/>
              {props.icons[index].icon}
              <div className={s.row}>
                <section
                  data-start="transform: translateY(110%)"
                  data-50p-top="transform: translateY(0)"
                  className={s.info}>
                  <Title type="h1" classes={{root: s.sectionTitle}}>
                    {item.title}
                  </Title>
                  {/*<Para className={s.para}>{item.descr}</Para>*/}
                  <Para className={s.para}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti incidunt inventore maxime non
                    pariatur perferendis quisquam ratione velit voluptatibus! Autem ex ipsum quasi tempore vitae! Ad
                    expedita nobis omnis voluptatem?
                  </Para>
                </section>
              </div>
              <div
                className={s.fullWidth}>
                <Button classes={{root: s.button}} onClick={props.handleGoTo}>
                  Оставить заявку
                </Button>
              </div>
            </Container>
          </div>
        ))}
      </div>

    </article>
  </div>
);
const items = [
  {
    icon: (
      <Peoples className={cx([s.icon, s.peoples])} />
    ),
  },
  {
    icon: <Spaces className={cx([s.icon, s.spaces])} />,
  },
  {
    id: 109,
    icon: (
      <Corporate className={cx([s.icon, s.corporate])} />
    ),
  },
];

const Component = withStyles(globalS, s)(ServicesList);
const List = props => <Component handleGoTo={props.handleGoTo} list={props.list} icons={items} />
export default List;

