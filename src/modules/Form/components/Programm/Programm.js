import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StaticModule from 'modules/Static';
import { createStructuredSelector } from 'reselect';
import { Input, Select, TextArea } from 'components/FormComponents';
import s from '../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getField } from '../../selectors';
import * as types from './actionTypes';
import * as actions from '../../actions';
import * as localActions from './actions';
import maskProvider from '../../maskProvider';
import onSuccess from '../../HOC/onSuccess';

const MaskedInput = maskProvider(Input);

class Programm extends Component {

  render() {
    return (
      <div className={cx([
        s.root,
        s.layout,
      ])}>

        <div className={cx([
          s.inner,
        ])}>
          <Header
            title="Заказать разработку программы"
            descr="Нужно сделать всего пару шагов и оставить свои пожелания.
Мы свяжемся с вами и обсудим все детали." />
          <div className={s.groupInput}>
            <Select
              value={this.props.product.val}
              error={this.props.product.error}
              defaultValue="Выберите продукт"
              placeholder="Выберите продукт"
              onChange={(val) => {this.props.onChange({ name: 'product', val })}}
              classes={{
                root: s.input,
              }}
              list={this.props.programs}
              />
            <TextArea
              value={this.props.comment.val}
              placeholder="Комментарии и пожелания"
              onChange={(e) => this.props.onChange({ name: 'comment', val: e.target.value })}
            />
          </div>
          <div className={s.groupInput}>
            <Input
              placeholder="Название компании"
              classes={{ root: s.input }}
              value={this.props.companyName.val}
              error={this.props.companyName.error}
              placeholder="Название вашей компании?"
              onFocus={() => this.props.onFocus({ name: 'companyName' })}
              onBlur={(e) => this.props.onBlur({ name: 'companyName', val: e.target.value })}
              onChange={(e) => this.props.onChange({ name: 'companyName', val: e.target.value })}
            />
            <Input
              value={this.props.person.val}
              error={this.props.person.error}
              placeholder="Как мы можем к вам обращаться?"
              onFocus={() => this.props.onFocus({ name: 'person' })}
              onBlur={(e) => this.props.onBlur({ name: 'person', val: e.target.value })}
              onChange={(e) => this.props.onChange({ name: 'person', val: e.target.value })}
            />
          </div>
          <div className={s.groupInput}>
            <MaskedInput
                  mask={{
                    alias: 'email',
                  }}
                   placeholder="Адрес электронной почты"
                   classes={{ root: s.input }}
                   value={this.props.email.val}
                   error={this.props.email.error}
                   onFocus={() => this.props.onFocus({ name: 'email' })}
                   onBlur={(e) => this.props.onBlur({ name: 'email', val: e.target.value })}
                   onChange={(e) => this.props.onChange({ name: 'email', val: e.target.value })}
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
            onChange={() => this.props.onChange({ name: 'acceptedRules', val: !this.props.acceptedRules.val })}
            onClick={this.props.onSubmit}
            isChecked={this.props.acceptedRules.val}
          />
        </div>
      </div>
    );
  }
}

Programm.propTypes = {
  email: PropTypes.shape({
      val: PropTypes.string,
      error: PropTypes.oneOf([PropTypes.string, PropTypes.null]),
    }).isRequired,
}

const mapStateToProps = createStructuredSelector({
  email: getField(types.NAME, 'email'),
  tel: getField(types.NAME, 'tel'),
  comment: getField(types.NAME, 'comment'),
  companyName: getField(types.NAME, 'companyName'),
  person: getField(types.NAME, 'person'),
  isLoading: getField(types.NAME, 'isLoading'),
  acceptedRules: getField(types.NAME, 'acceptedRules'),
  product: getField(types.NAME, 'product'),
  isCompleted: getField(types.NAME, 'isCompleted'),
  programs: StaticModule.selectors.getChunck('programs'),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: ({ name, val }) => dispatch(actions.fieldChange({ name, formName: types.NAME, val })),
  onFocus: name => dispatch(actions.clearInput({ name, formName: types.NAME })),
  onBlur: ({ name, val }) => dispatch(actions.fieldBlur({ name, formName: types.NAME, val })),
  onSubmit: () => dispatch(localActions.formSubmit({ formName: types.NAME })),
  onFormReset: () => dispatch(actions.formReset({ formName: types.NAME })),
});

export default connect(mapStateToProps, mapDispatchToProps)(onSuccess(Programm));
