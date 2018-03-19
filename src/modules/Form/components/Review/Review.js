import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, TextArea } from 'components/FormComponents';
import s from '../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getField } from '../../selectors';
import * as types from './actionTypes';
import * as actions from '../../actions';
import * as localActions from './actions';
import onSuccess from '../../HOC/onSuccess';

class Review extends Component {

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
            title="Оставьте свой отзыв"
            descr="Нужно сделать всего пару шагов и оставить свои пожелания.
Мы свяжемся с вами и обсудим все детали." />
          <div className={s.groupInput}>
            <Input
              placeholder="Имя и фамилия"
              classes={{ root: s.input }}
              value={this.props.person.val}
              error={this.props.person.error}
              onChange={(e) => this.props.onChange({ name: 'person', val: e.target.value })}
            />
            <Input
              placeholder="Название компании"
              onChange={(e) => this.props.onChange({ name: 'companyName', val: e.target.value })}
              classes={{ root: s.input }}
              value={this.props.companyName.val}
              error={this.props.companyName.error}
            />
            <TextArea
              value={this.props.comment.val}
              error={this.props.comment.error}
              placeholder="Комментарий"
              onChange={(e) => this.props.onChange({ name: 'comment', val: e.target.value })}
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

Review.propTypes = {}

const mapStateToProps = state => createStructuredSelector({
  comment: getField(types.NAME, 'comment'),
  companyName: getField(types.NAME, 'companyName'),
  person: getField(types.NAME, 'person'),
  isLoading: getField(types.NAME, 'isLoading'),
  acceptedRules: getField(types.NAME, 'acceptedRules'),
  isCompleted: getField(types.NAME, 'isCompleted'),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: ({ name, val }) => dispatch(actions.fieldChange({ name, formName: types.NAME, val })),
  onFocus: name => dispatch(actions.clearInput({ name, formName: types.NAME })),
  onBlur: ({ name, val }) => dispatch(actions.fieldBlur({ name, formName: types.NAME, val })),
  onSubmit: () => dispatch(localActions.formSubmit({ formName: types.NAME })),
  onFormReset: () => dispatch(actions.formReset({ formName: types.NAME })),
});

export default connect(mapStateToProps, mapDispatchToProps)(onSuccess(Review));
