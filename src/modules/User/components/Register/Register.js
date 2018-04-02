import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Register.css';
import { Input, Group } from 'components/Form';
import Title from 'components/Title';
import Button from 'components/Button';
import * as actions from '../../actions';
import * as types from '../../actionTypes';
import Validator from 'modules/Validator';
import { Formik } from 'formik';

const Register = ({ register, serverErrors, isLoading }) => (
  <Formik
    validationSchema={Validator.object().shape({
      email: Validator.string()
        .email('Некорректный email')
        .required('Email обязательное поле'),
      phone: Validator.string()
        .required('Телефон обязательное поле')
        .phone('Некорректный номер телефона'),
      password: Validator.string()
        .required('Пароль обязательное поле')
        .min(8, 'Пароль должен быть минимум из 8 символов'),
      name: Validator.string().required('Имя обязательное поле'),
    })}
    initialValues={{
      email: '',
      phone: '',
      password: '',
      name: '',
    }}
    onSubmit={(
      values,
      {
        props,
        setSubmitting,
        setErrors /* setValues, setStatus, and other goodies */,
      },
    ) => {
      register({
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });
      setTimeout(() => setSubmitting(false), 1000);
    }}
    render={({ values, errors, handleSubmit, handleChange }) => {
      const errs = Object.assign({}, serverErrors, errors);
      console.log(isLoading);
      return (
        <div className={s.root}>
          <Title type="h2" center>
            Регистрация
          </Title>
          <form action="" onSubmit={handleSubmit}>
            <Group>
              <Input
                label="Ваше Имя*"
                placeholder="Ваше Имя"
                value={values.name}
                error={errs.name}
                onChange={handleChange}
                name="name"
              />
            </Group>
            <Group>
              <Input
                name="email"
                label="Email*"
                placeholder="Email"
                type="text"
                value={values.email}
                onChange={handleChange}
                error={errs.email}
              />
            </Group>
            <Group>
              <Input
                label="Телефон*"
                placeholder="Телефон"
                type="tel"
                name="phone"
                error={errs.phone}
                value={values.phone}
                onChange={handleChange}
              />
            </Group>
            <Group>
              <Input
                label="Password*"
                placeholder="Password"
                name="password"
                type="password"
                error={errs.password}
                value={values.password}
                onChange={handleChange}
              />
            </Group>
            <Button
              type="submit"
              isLoading={isLoading}
              theme="black"
              fullWidth
            >
              Register
            </Button>
            <div className={s.already}>
              <span/>
              <span>Already have an account?</span>
            </div>
            <Button type="submit" theme="gray" fullWidth>
              Login
            </Button>
          </form>
        </div>

      )
    }}
  />
);

export default connect(
  state => ({
    isLoading: state[types.NAME].register.isLoading,
    serverErrors: {
      ...state[types.NAME].register.errors,
    },
  }),
  { register: actions.register },
)(withStyles(s)(Register));
