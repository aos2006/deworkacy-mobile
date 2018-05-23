/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ui.scss';
import Title from 'components/Title';
import Para from 'components/Para';
import Button from 'components/Button';

class Ui extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Title type="h1" classes={{ root: s.title }}>
          h1
        </Title>
        <Title type="h2" classes={{root: s.title}}>
          h2
        </Title>
        <Title type="h3" classes={{root: s.title}}>
          h3
        </Title>
        <Title type="h4" classes={{root: s.title}}>
          h4
        </Title>
        <Title type="h5" classes={{root: s.title}}>
          h5
        </Title>
        <Para className={s.para}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cum magnam nobis quia quibusdam. Iure molestiae officiis quibusdam reprehenderit sapiente.
        </Para>
        <Para className={s.para} type="medium" theme="gray">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cum magnam nobis quia quibusdam. Iure
          molestiae officiis quibusdam reprehenderit sapiente.
        </Para>
        <Button>
          Кнопка
        </Button>
        <Button fullWidth>
          Кнопка на всю ширину
        </Button>
        <Button fullWidth isLoading>
          Кнопка загружается
        </Button>
      </div>
    );
  }
}

export default withStyles(s)(Ui);
