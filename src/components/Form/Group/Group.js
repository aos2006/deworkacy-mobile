import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Group.css';

const Group = ({ children }) => <div className={s.root}>{children}</div>;

export default withStyles(s)(Group);
