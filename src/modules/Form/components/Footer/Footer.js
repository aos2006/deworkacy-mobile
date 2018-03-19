import React from 'react';
import cx from 'classnames';
import { Checkbox } from 'components/FormComponents';
import Button from 'components/Button/Button';
import s from './Footer.css';
import policity from 'static/policity.pdf';

const Footer = ({
  isLoading,
  onChange,
  onClick,
  isChecked,
  error,
}) => (
  <div className={cx([
    s.root,
  ])}>
    <Button
      label="Отправить заявку"
      fullWidth
      classes={{ root: s.button }}
      isLoading={isLoading}
      onClick={onClick} />
    <Checkbox
      error={error}
      label={<div>Я согласен на обработку персональных данных <br /> <a href={policity} target="_blank">Политика конфиденциальности</a> </div>}
      center
      checked={isChecked}
      onChange={onChange} />
  </div>
);

export default Footer;
