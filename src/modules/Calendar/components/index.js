import React, { PureComponent } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as types from '../actionTypes';
import s from './Calendar.scss';
import { Calendar } from 'antd';
import calendarAntdS from 'antd/lib/calendar/style/index.css';
import antdTheme from './antdTheme/index.scss';
import SectionHeader from 'components/SectionHeader';
import Container from 'components/Container';
import moment from 'moment';
import 'moment/locale/ru';
const momentInit = moment.locale('ru');
import Event from './Event';
import Header from './Header';
import {Spin, Icon } from 'antd';
import Slider from 'components/Slider';
const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

const keyFormat = 'ddddMMMMDoYYYY';

const hashCode = function (s) {
  return s.split("").reduce(function (a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a
  }, 0);
}

class AppCalendar extends PureComponent {
  state = {
    events: [],
    currentMonth: moment(),
    selectedValue: moment().format('D'),
  }

  componentDidMount() {
    const from = moment()
      .date(1);
    const to = moment()
      .endOf('month');

    this.props.fetchEvents({
      from: from.unix(),
      to: to.unix(),
      locationId: null,
    });
  }

  handleNext = () => {
    const nextMonth = this.state.currentMonth.add(1, "M");
    const from = nextMonth.endOf('month').date(1).unix();
    const to = nextMonth.endOf('month').unix();

    this.setState({
      currentMonth: nextMonth.date(1),
    });

    this.props.fetchEvents({
      from: from,
      to: to,
      locationId: null,
    })
  }

  handlePrev = () => {
    const nextMonth = this.state.currentMonth.subtract(1, "M");
    const from = nextMonth.endOf('month').date(1).unix();
    const to = nextMonth.endOf('month').unix();

    this.setState({
      currentMonth: nextMonth.date(1),
    });

    this.props.fetchEvents({
      from: from,
      to: to,
      locationId: null,
    })
  }

  handleSelect = (value) => {
   this.setState({
     selectedValue: value.format('D'),
     events: this.props.days[value.format('D')] || [],
   })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: nextProps.days[this.state.selectedValue] || [],
    });
  }

  render() {
    const currentMonthStr = this.state.currentMonth.format('MMMM');
    const headerTitle = currentMonthStr.charAt(0).toUpperCase() + currentMonthStr.slice(1);

    return (
      <div
        data-top="opacity: 1;"
        data-200-top="opacity: 0;"
        data--106-top="opacity: 0"
        data--50-top="opacity: 1"
        className={s.root}>
        {this.props.isLoading && <Spin indicator={antIcon} className={s.loader} />}
        <Container>
          <SectionHeader
            className={s.sectionHeader}
            title="Мероприятия"
          />
          <Header
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
            title={headerTitle}
            className={s.calendarHeader}
          />
          <Calendar
            onSelect={this.handleSelect}
            value={this.state.currentMonth}
            dateFullCellRender={(date) => {
              const hashKey = date.format('D');
              const hasEvent = Object.prototype.hasOwnProperty.call(this.props.days, hashKey);
              return <span className="ant-fullcalendar-date">
                <span className={
                  cx([
                    'ant-fullcalendar-value',
                    `${hasEvent ? 'app-calendar__has-event' : ''}`,
                    `${this.state.selectedValue === hashKey ? 'app-calendar__selected' : ''}`,
                  ])
                }>
                  {date.format('DD')}
                </span>
              </span>
            }}
            className={cx([
              s.calendar,
              'app-calendar',
            ])}
            fullscreen={false}
          />
          {this.state.events.length > 0 ? (<Slider
          dotsClass={s.dots}
            settings={{
            customDots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }}>
            {
              this.state.events.map(item => {
                console.log(item);
                return (
                  <Event
                    place={item.location}
                    className={s.event}
                    img={item.photo.url}
                    key={item.id}
                    title={item.title}
                    range={`${moment(item.timestampStart).format('DD MMMM')} - ${moment(item.timestampFinish).format('DD MMMM')}`}
                    time={moment(item.timestampStart).format('HH:MM')}
                  />
                )
              })
            }
          </Slider>) : <p className={s.nothing}>Нет мероприятий</p>}
        </Container>
      </div>
    )
  }
}

const converRightUnix = unix => unix * 1000;

export default connect(
  state => {
    const s = state[types.NAME];

    return {
      isLoading: s.isLoading,
      events: s.events,
      days: s.days,
    }
  },
  { fetchEvents: actions.fetchEvents }
)(withStyles(calendarAntdS, antdTheme, s)(AppCalendar));
