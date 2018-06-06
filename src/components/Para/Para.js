import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Para.scss';

const Para = props => (
  <p
    dangerouslySetInnerHTML={{
      __html: props.children,
    }}
    className={cx([
      s.root,
      props.className,
      {
        [s[props.type]]: true,
        [s.black]: props.black,
        [s[props.theme]]: true,
      },
    ])}
  />
);

Para.defaultProps = {
  type: 'large',
  theme: 'white',
};

export default withStyles(s)(Para);
