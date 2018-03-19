export const textPattern = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
export const numberPattern = /^[0-9]+$/;
export const namePattern = /^[а-яА-ЯёЁa-zA-Z]+$/;
export const telPattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
export const emailPattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
export const datePattern = new RegExp(
  '([0-9]{4}[.](0[1-9]|1[0-2])[.]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[.](0[1-9]|1[0-2])[.][0-9]{4})',
);
export const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
export const notEmptyPattern = /./;
export const floatNumberPattern = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;
