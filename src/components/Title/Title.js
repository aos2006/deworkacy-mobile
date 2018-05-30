import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Title.scss';

const Title = ({ type, children, classes, center, id, black }) =>
  React.createElement(
    type,
    {
      id,
      className: cx([
        s.title,
        {
          [s.center]: center,
          [s.black]: black,
        },
        classes.root,
      ]),
    },
    children,
  );

Title.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.any,
  center: PropTypes.bool,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
};

Title.defaultProps = {
  children: '',
  id: '',
  black: false,
  type: 'h3',
  center: false,
  classes: { root: '' },
};

export default withStyles(s)(Title);
