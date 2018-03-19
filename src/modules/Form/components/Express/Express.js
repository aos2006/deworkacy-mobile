import React, { Component } from 'react';
import { Input } from 'components/FormComponents';
import Descr from 'components/Descr/Descr';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getField } from '../../selectors';
import * as types from './actionTypes';
import * as actions from '../../actions';
import * as localActions from './actions';
import { RadioGroup } from 'components/FormComponents';
import maskProvider from '../../maskProvider';
import Footer from '../Footer/Footer';
import s from '../index.css';
import styles from './Express.css';
import onSuccess from '../../HOC/onSuccess';

const MaskedInput = maskProvider(Input);

class Express extends Component {

  render() {
    return (
      <div className={s.layout}>
        <Descr medium center classes={{ root: styles.descr }}>
          Нужно сделать всего пару шагов и оставить свои пожелания.
          Мы свяжемся с вами и обсудим все детали.
        </Descr>
        <div className={s.groupInput}>
          <RadioGroup
            onChange={(e) => this.props.onChange({ name: 'orderType', val: e.target.value })}
            label="Выберите тип заявки"
            value={this.props.orderType.val}
            list={[
              {
                val: 1,
                txt: 'Мероприятия',
              },
              {
                val: 2,
                txt: 'Рабочие пространства',
              }
            ]}
          />
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
            placeholder="Номер телефона"
            mask={{ alias: 'phone', mask: '+7(999) 999-99-99' }}
            value={this.props.tel.val}
            error={this.props.tel.error}
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

const mapStateToProps = state => createStructuredSelector({
  person: getField(types.NAME, 'person'),
  tel: getField(types.NAME, 'tel'),
  acceptedRules: getField(types.NAME, 'acceptedRules'),
  isLoading: getField(types.NAME, 'isLoading'),
  isCompleted: getField(types.NAME, 'isCompleted'),
  orderType: getField(types.NAME, 'orderType'),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: ({ name, val }) => dispatch(actions.fieldChange({ name, formName: types.NAME, val })),
  onFocus: name => dispatch(actions.clearInput({ name, formName: types.NAME })),
  onBlur: ({ name, val }) => dispatch(actions.fieldBlur({ name, formName: types.NAME, val })),
  onSubmit: () => dispatch(localActions.formSubmit({ formName: types.NAME })),
  onFormReset: () => dispatch(actions.formReset({ formName: types.NAME })),
})
export default connect(mapStateToProps, mapDispatchToProps)(onSuccess(Express));
