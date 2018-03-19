import React, { Component } from 'react';
import cx from 'classnames';
import StaticModule from 'modules/Static';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Select, Input } from 'components/FormComponents';
import { getField } from '../../selectors';
import * as types from './actionTypes';
import * as actions from '../../actions';
import * as localActions from './actions';
import maskProvider from '../../maskProvider';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import s from '../index.css';
import onSuccess from '../../HOC/onSuccess';

const MaskedInput = maskProvider(Input);

class WorkSpace extends Component {
  state = {
    loc: null,
    space: null,
  }

  getLocationId = () => {
    const loc = this.props.location.pathname;

    switch (loc) {
      case '/':
      case '/spaces/corporateinnovationshub':
        return 3;
      case '/spaces/october':
        return 1;
      case '/spaces/izvestiya':
        return 2;
    }
  }

  componentDidMount() {
    if (!this.props.loc.val) {
      // this.props.onChange({
      //   name: 'loc',
      //   val: StaticModule.selectors.getById(this.props.locations, this.getLocationId())[0].val,
      // });
    }

    if (!this.props.space.val) {
      // this.props.onChange({
      //   name: 'space',
      //   val: StaticModule.selectors.getById(this.props.spaces, this.getLocationId(), 'locationId')[0].val,
      // });
    }
  }


  render() {
    return (
      <div className={cx([
        s.root,
        s.layout,
      ])}>
        <Header
          title="Оставить заявку на рабочие пространства"
          descr="Нужно сделать всего пару шагов и оставить свои пожелания.
Мы свяжемся с вами и обсудим все детали." />
        <div className={s.inner}>
          <div className={s.groupInput}>
            <Select
              placeholder="Выберите локацию"
              onChange={val => this.props.onChange({ name: 'loc', val })}
              value={this.props.loc.val}
              error={this.props.loc.error}
              classes={{
                root: s.input,
              }}
              list={StaticModule.selectors.getById(this.props.locations, this.getLocationId())} />
            <Select
              placeholder="Выберите рабочее пространство"
              onChange={val => this.props.onChange({ name: 'space', val })}
              value={this.props.space.val}
              error={this.props.space.error}
              list={StaticModule.selectors.getById(this.props.spaces, this.getLocationId(), 'locationId')} />
          </div>
          <div className={s.groupInput}>
            <Input
              placeholder="Имя и фамилия"
              value={this.props.person.val}
              error={this.props.person.error}
              classes={{ root: s.input }}
              onFocus={() => this.props.onFocus({ name: 'person' })}
              onBlur={e => this.props.onBlur({ name: 'person', val: e.target.value })}
              onChange={e => this.props.onChange({ name: 'person', val: e.target.value })} />
            <MaskedInput
              value={this.props.email.val}
              error={this.props.email.error}
              placeholder="Адрес электронной почты"
              classes={{ root: s.input }}
              mask={{ alias: 'email' }}
              onFocus={() => this.props.onFocus({ name: 'email' })}
              onBlur={e => this.props.onBlur({ name: 'email', val: e.target.value })}
              onChange={e => this.props.onChange({ name: 'email', val: e.target.value })} />
            <MaskedInput
              value={this.props.tel.val}
              error={this.props.tel.error}
              placeholder="Номер телефона"
              mask={{ alias: 'phone', mask: '+7(999) 999-99-99' }}
              onFocus={() => this.props.onFocus({ name: 'tel' })}
              onBlur={e => this.props.onBlur({ name: 'tel', val: e.target.value })}
              onChange={e => this.props.onChange({ name: 'tel', val: e.target.value })} />
          </div>
          <Footer
            error={this.props.acceptedRules.error}
            isLoading={this.props.isLoading}
            onChange={() => this.props.onChange({
              name: 'acceptedRules',
              val: !this.props.acceptedRules.val,
            })}
            onClick={this.props.onSubmit}
            isChecked={this.props.acceptedRules.val} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => createStructuredSelector({
  loc: getField(types.NAME, 'loc'),
  space: getField(types.NAME, 'space'),
  person: getField(types.NAME, 'person'),
  email: getField(types.NAME, 'email'),
  tel: getField(types.NAME, 'tel'),
  acceptedRules: getField(types.NAME, 'acceptedRules'),
  isLoading: getField(types.NAME, 'isLoading'),
  isCompleted: getField(types.NAME, 'isCompleted'),
  locations: StaticModule.selectors.getChunck('locations'),
  spaces: StaticModule.selectors.getSpaces,
});

const mapDispatchToProps = dispatch => ({
  onChange: ({ name, val }) => dispatch(actions.fieldChange({ name, formName: types.NAME, val })),
  onFocus: name => dispatch(actions.clearInput({ name, formName: types.NAME })),
  onBlur: ({ name, val }) => dispatch(actions.fieldBlur({ name, formName: types.NAME, val })),
  onSubmit: () => dispatch(localActions.formSubmit({ formName: types.NAME })),
  onFormReset: () => dispatch(actions.formReset({ formName: types.NAME })),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(onSuccess(WorkSpace)));
