import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Simple.scss';
import { Formik } from 'formik';
import Input from '../Input/Input';
import Container from 'components/Container';
import Button from 'components/Button';
import Title from 'components/Title';
import Para from 'components/Para';
import Radio from '../Radio';
import RadioGroup from '../RadioGroup';
import Validator from 'modules/Validator';
import Api from 'modules/Api';
import * as cons from '../../constants';
import { notification } from 'antd';
import Tooltip from 'components/Tooltip';

const schema = Validator.object().shape({
  fio: Validator.string().required('Обязательное поле'),
  phone: Validator.string()
    .phone('Неккоректный телефон')
    .required('Обязательное поле'),
});

const Simple = props => (
  <Formik
    validationSchema={schema}
    onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
      Api.actions
        .api({
          url: cons.simple_form_api,
          params: {
            method: 'post',
            body: {
              contactName: values.fio,
              phone: values.phone,
              type: values.type,
            },
          },
        })
        .then(data => {
          setSubmitting(false);
          notification.success({
            message: 'Заявка успешно отправлена',
            duration: 5,
          });
          resetForm();
        })
        .catch(err => {
          setSubmitting(false);
          notification.error({
            message: 'Ошибка запроса',
            description: 'Пожалуйста сообщите нам об этом !!!!',
            duration: 5,
          });
        });
    }}
    initialValues={{
      fio: '',
      phone: '',
      type: 1,
    }}
    render={({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      handleSubmit,
      isSubmitting,
    }) => {
      return (
        <div className={cx([s.root])}>
          <Container>
            <Title type="h3" classes={{root: s.title}}>
              Оставьте заявку
            </Title>
            <Para className={s.para}>
              Мы свяжемся с вами и обсудим все детали
            </Para>
            <div className={s.radioGroup}>
              <span className={s.label}>Выберите тип заявки:</span>
              <RadioGroup
                value={values.type}
                defaultValue={1}
                onChange={ev => setFieldValue('type', ev.target.value)}
              >
                <Radio className={s.radio} value={1}>
                  Мероприятия
                </Radio>
                <Radio className={s.radio} value={2}>
                  Рабочие простанства
                </Radio>
              </RadioGroup>
            </div>
            <span className={s.label}>Ваши контакты:</span>
            <div className={s.inputGroup}>
              <Tooltip placement="topRight" visible={errors.fio || false} title={errors.fio || null} className={s.tooltip}/>
              <Input
                value={values.fio}
                placeholder="Имя и Фамилия"
                name="fio"
                onChange={ev => setFieldValue('fio', ev.target.value)}
              />
            </div>
            <div className={s.inputGroup}>
              <Tooltip placement="topRight" visible={errors.phone || false} title={errors.phone || null} className={s.tooltip}/>
              <Input
                value={values.phone}
                onChange={ev => setFieldValue('phone', ev.target.value)}
                name="phone"
                placeholder="Телефон"
                mask={[
                  '+',
                  '7',
                  '(',
                  /[1-9]/,
                  /\d/,
                  /\d/,
                  ')',
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            </div>
            <Button
              fullWidth
              type="submit"
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Отправить заявку
            </Button>
          </Container>
        </div>
      )
    }}
  />
);

export default withStyles(s)(Simple);