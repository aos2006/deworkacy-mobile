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
import { notification, message } from 'antd';
import messageS from 'antd/lib/message/style/index.css';
import Tooltip from 'components/Tooltip';
import Rules from '../Rules';
import SectionDevider from 'components/SectionDevider';
import globalS from './globalStyles/index.scss';


const schema = Validator.object().shape({
  fio: Validator.string().required('Имя и фамилия обязательное поле'),
  phone: Validator.string()
    .phone('Некорректный телефон')
    .required('Телефон обязательное поле'),
  rules: Validator.boolean().oneOf([true], 'Необходимо согласиться'),
});

class Simple extends React.PureComponent {
  state = {
    activeBg: s.eventsBg,
  }

  setBg = type => {
    const types = {
      '1': s.eventsBg,
      '2': s.spacesBg,
      '3': s.corpBg,
    }
    return this.setState({
      activeBg: types[type],
    })
  }

  render () {
    const { activeBg } = this.state;
    return (
      <div id="order" className={cx([
        'section',
        'simple-order',
      ])}>
        <Formik
          validateOnChange={false}
          validationSchema={schema}
          onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
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
            rules: false,
          }}
          render={({
                     values,
                     errors,
                     setFieldValue,
                     handleSubmit,
                     isSubmitting,
                   }) => {
            return (
              <div
                id="simpleOrder"
                className={cx([
                  s.root,
                  'simple-order-bg',
                  this.state.activeBg,
                ])}>
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
                      name="type"
                      value={values.type}
                      defaultValue={1}
                      onChange={ev => {
                        setFieldValue('type', ev.target.value)
                      }}
                    >
                      <div onClick={() => {
                        setFieldValue('type', 1);
                        this.setBg(1)
                      }}>
                        <Radio className={s.radio} value={1}>
                          Мероприятия
                        </Radio>
                      </div>
                      <div onClick={() => {
                        setFieldValue('type', 2);
                        this.setBg(2)
                      }}>
                        <Radio className={s.radio} value={2}>
                          Рабочие простанства
                        </Radio>
                      </div>
                      <div onClick={() => {
                        setFieldValue('type', 3);
                        this.setBg(3)
                      }}>
                        <Radio className={s.radio} value={3}>
                          Корпоративные инновации
                        </Radio>
                      </div>
                    </RadioGroup>
                  </div>
                  <span className={s.label}>Ваши контакты:</span>
                  <div className={s.inputGroup}>
                    <Tooltip title={errors.fio} visible={errors.fio}>
                      <Input
                        value={values.fio}
                        placeholder="Имя и Фамилия"
                        name="fio"
                        onChange={ev => setFieldValue('fio', ev.target.value)}
                      />
                    </Tooltip>
                  </div>
                  <div className={s.inputGroup}>
                    <Tooltip
                      visible={errors.phone}
                      title={errors.phone}>
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
                    </Tooltip>
                  </div>
                  <div className={s.inputGroup}>
                    <Button
                      fullWidth
                      type="submit"
                      onClick={handleSubmit}
                      isLoading={isSubmitting}
                    >
                      Отправить заявку
                    </Button>
                  </div>
                  <Rules
                    onClick={() => setFieldValue('rules', !values.rules)}
                    name="rules"
                    isError={errors.rules}
                    onChange={(ev) => setFieldValue('rules', ev.target.checked)}
                    checked={values.rules}
                  />
                </Container>
                <SectionDevider full className={s.devider}/>
              </div>
            );
          }}
        />
      </div>
    )
  }
}

export default withStyles(messageS, globalS, s,)(Simple);
