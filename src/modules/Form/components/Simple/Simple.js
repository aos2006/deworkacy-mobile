import React, { Component } from 'react';
import { Select, Input, CheckboxGroup, RadioGroup } from 'components/FormComponents';
import Descr from 'components/Descr/Descr';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import staticModule from 'modules/Static';
import { getField } from '../../selectors';
import * as types from './actionTypes';
import * as actions from '../../actions';
import * as localActions from './actions';
import maskProvider from '../../maskProvider';
import Footer from '../Footer/Footer';
import s from '../index.css';
import styles from './Simple.css';
import onSuccess from '../../HOC/onSuccess';

const MaskedInput = maskProvider(Input);

class Simple extends Component {
  render() {
    return (
      <div className={s.layout}>
        <Descr medium center classes={{ root: styles.descr }}>
          Нужно сделать всего пару шагов и оставить свои пожелания.
          Мы свяжемся с вами и обсудим все детали.
        </Descr>
        <Select
          value={this.props.location.val}
          error={this.props.location.error}
          onChange={(val) => this.props.onChange({ name: 'location', val })}
          defaultValue="Выберите локацию"
          placeholder="Выберите локацию"
          classes={{
            root: s.select,
          }}
          list={this.props.locations}
        />
        <div className={s.inner}>
          <div className={s.groupInput}>
            <RadioGroup
              onChange={(e) => this.props.onChange({ name: 'personQuantity', val: e.target.value })}
              label="Количество гостей"
              value={this.props.personQuantity.val}
              list={this.props.guestsCounts}
            />
          </div>
          <div className={s.groupInput}>
            <CheckboxGroup
              onChange={(val) => this.props.onChange({ name: 'additionalServices', val })}
              checkedList={this.props.additionalServices.val}
              classes={{
                root: styles.checkboxGroup,
              }}
              list={this.props.servicesList}
              groupLabel="Потребуются ли Вам дополнительные услуги"
            />
          </div>
        </div>
        <div className={s.groupInput}>
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
            placeholder="Адрес электронной почты"
            classes={{ root: s.input }}
            mask={{ alias: 'email' }}
            value={this.props.email.val}
            error={this.props.email.error}
            onFocus={() => this.props.onFocus({ name: 'email' })}
            onBlur={(e) => this.props.onBlur({ name: 'email', val: e.target.value })}
            onChange={(e) => this.props.onChange({ name: 'email', val: e.target.value })}
          />
          <MaskedInput
            placeholder="Номер телефона"
            value={this.props.tel.val}
            error={this.props.tel.error}
            mask={{ alias: 'phone', mask: '+7(999) 999-99-99' }}
            onFocus={() => this.props.onFocus({ name: 'tel' })}
            onBlur={(e) => this.props.onBlur({ name: 'tel', val: e.target.value })}
            onChange={(e) => this.props.onChange({ name: 'tel', val: e.target.value })}
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
  location: getField(types.NAME, 'location'),
  personQuantity: getField(types.NAME, 'personQuantity'),
  additionalServices: getField(types.NAME, 'additionalServices'),
  person: getField(types.NAME, 'person'),
  email: getField(types.NAME, 'email'),
  tel: getField(types.NAME, 'tel'),
  acceptedRules: getField(types.NAME, 'acceptedRules'),
  isLoading: getField(types.NAME, 'isLoading'),
  isCompleted: getField(types.NAME, 'isCompleted'),
  locations: staticModule.selectors.getChunck('locations'),
  servicesList: staticModule.selectors.getServices(),
  guestsCounts: staticModule.selectors.getChunck('guestSelector'),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: ({ name, val }) => dispatch(actions.fieldChange({ name, formName: types.NAME, val })),
  onFocus: name => dispatch(actions.clearInput({ name, formName: types.NAME })),
  onBlur: ({ name, val }) => dispatch(actions.fieldBlur({ name, formName: types.NAME, val })),
  onSubmit: () => dispatch(localActions.formSubmit({ formName: types.NAME })),
  onFormReset: () => dispatch(actions.formReset({ formName: types.NAME })),
})

export default connect(mapStateToProps, mapDispatchToProps)(onSuccess(Simple));
