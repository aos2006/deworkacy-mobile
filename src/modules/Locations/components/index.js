import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Map from './Map';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Locations.scss';
import List from './List';
import * as types from '../actionTypes';
import * as actions from '../actions';
import SectionHeader from 'components/SectionHeader';
import Card from './Card';

class Locations extends PureComponent {
  handleChange = i => this.props.locationChange(i);
  state = {
    clickedLocation: null,
  }

  handleClose = () => this.setState({
    clickedLocation: null,
  })

  handleToggle = i => this.setState({
    clickedLocation: i,
  });

  render() {
    return (
      <div
        data-center="opacity: 1;"
        data-200-top="opacity: 0;"
        data--30p-top="opacity: 0"
        data--50-top="opacity: 1"
        className={cx([s.root])}
      >
        <div className={s.map}>
          <div className={s.header}>
            <SectionHeader title="Локации" />
          </div>
          <Card
            handleClose={this.handleClose}
            show={0 === this.state.clickedLocation}
            title="Deworkacy Красный Октябрь"
            address="Берсеневская наб., д. 6, стр. 3, этаж 6  (10 минут от м. Кропоткинская)"
            txt="Флагманское пространство Deworkacy расположено в сердце креативного кластера Красного Октября. Кирпичный лофт общей площадью 1700 кв.м занимает шестой этаж бывшего цеха кондитерской фабрики, памятника архитектуры XIX века. Проект обеспечивает идеальную эргономику помещения; единое пространство поделено на несколько функциональных зон: коворкинг, офисы, переговорные, библиотека, два лектория и конференц-зал."
          />
          <Card
            handleClose={this.handleClose}
            show={1 === this.state.clickedLocation}
            title="Deworkacy Красный Октябрь"
            address="Берсеневская наб., д. 6, стр. 3, этаж 6  (10 минут от м. Кропоткинская)"
            txt="Флагманское пространство Deworkacy расположено в сердце креативного кластера Красного Октября. Кирпичный лофт общей площадью 1700 кв.м занимает шестой этаж бывшего цеха кондитерской фабрики, памятника архитектуры XIX века. Проект обеспечивает идеальную эргономику помещения; единое пространство поделено на несколько функциональных зон: коворкинг, офисы, переговорные, библиотека, два лектория и конференц-зал."
          />
          <Card
            handleClose={this.handleClose}
            show={2 === this.state.clickedLocation}
            title="Deworkacy Красный Октябрь"
            address="Берсеневская наб., д. 6, стр. 3, этаж 6  (10 минут от м. Кропоткинская)"
            txt="Флагманское пространство Deworkacy расположено в сердце креативного кластера Красного Октября. Кирпичный лофт общей площадью 1700 кв.м занимает шестой этаж бывшего цеха кондитерской фабрики, памятника архитектуры XIX века. Проект обеспечивает идеальную эргономику помещения; единое пространство поделено на несколько функциональных зон: коворкинг, офисы, переговорные, библиотека, два лектория и конференц-зал."
          />
          <Map defaultCenter={this.props.position} />
          <div
            data-start="transform: translateX(100%)"
            data-10-bottom="transform: translateX(0)"
            className={s.list}>
            <List
              handleToggle={this.handleToggle}
              list={this.props.locations}
              activeLocation={this.props.activeLocation}
              onLocationChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const activeLocation = state[types.NAME].activeLocation;
    console.log(activeLocation);
    return {
      activeLocation,
      position: state[types.NAME].entities[`${activeLocation}`].position,
    };
  },
  { locationChange: actions.locationChange },
)(withStyles(s)(Locations));
