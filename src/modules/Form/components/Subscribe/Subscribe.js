import React, { Component } from 'react';
import StaticModule from 'modules/Static';
import { Input, Select } from 'components/FormComponents';
import Descr from 'components/Descr/Descr';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getField } from '../../selectors';
import * as types from './actionTypes';
import * as actions from '../../actions';
import * as localActions from './actions';
import maskProvider from '../../maskProvider';
import Footer from '../Footer/Footer';
import s from '../index.css';
import styles from './Subscribe.css';
import onSuccess from '../../HOC/onSuccess';

const MaskedInput = maskProvider(Input);

class Subscribe extends Component {

  render() {
    return (
      <div className={s.layout}>
        <Descr medium center classes={{ root: styles.descr }}>
          Нужно сделать всего пару шагов и оставить свои пожелания.
          Мы свяжемся с вами и обсудим все детали.
        </Descr>
        <div className={s.groupInput}>
          <Select
            value={this.props.role.val}
            error={this.props.role.error}
            onChange={(val) => this.props.onChange({ name: 'role', val })}
            defaultValue="Выберите свою роль"
            placeholder="Выберите свою роль"
            classes={{
              root: s.select,
            }}
            list={this.props.roles}
          />
          <Input
            placeholder="Имя и фамилия"
            classes={{ root: s.input }}
            value={this.props.person.val}
            error={this.props.person.error}
            onFocus={() => this.props.onFocus({ name: 'person' })}
            onBlur={(e) => this.props.onBlur({ name: 'person', val: e.target.value })}
            onChange={(e) => this.props.onChange({ name: 'person', val: e.target.value })}
          />
          <MaskedInput
            placeholder="Ваша почта"
            mask={{ alias: 'email' }}
            value={this.props.email.val}
            error={this.props.email.error}
            onFocus={() => this.props.onFocus({ name: 'email' })}
            onBlur={(e) => this.props.onBlur({ name: 'email', val: e.target.value })}
            onChange={(e) => this.props.onChange({ name: 'email', val: e.target.value })}
          />
        </div>
        <Footer
          error={this.props.acceptedRules.error}
          isLoading={this.props.isLoading}
          onChange={() => this.props.onChange({
            name: 'acceptedRules',
            val: !this.props.acceptedRules.val,
          })}
          onClick={this.props.onSubmit}
          isChecked={this.props.acceptedRules.val}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  person: getField(types.NAME, 'person'),
  email: getField(types.NAME, 'email'),
  role: getField(types.NAME, 'role'),
  roles: StaticModule.selectors.getChunck('roles'),
  acceptedRules: getField(types.NAME, 'acceptedRules'),
  isLoading: getField(types.NAME, 'isLoading'),
  isCompleted: getField(types.NAME, 'isCompleted'),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: ({ name, val }) => dispatch(actions.fieldChange({ name, formName: types.NAME, val })),
  onFocus: name => dispatch(actions.clearInput({ name, formName: types.NAME })),
  onBlur: ({ name, val }) => dispatch(actions.fieldBlur({ name, formName: types.NAME, val })),
  onSubmit: () => dispatch(localActions.formSubmit({ formName: types.NAME })),
  onFormReset: () => dispatch(actions.formReset({ formName: types.NAME })),
})
export default connect(mapStateToProps, mapDispatchToProps)(onSuccess(Subscribe));
