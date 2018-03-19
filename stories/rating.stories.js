import React from 'react';

import {storiesOf} from '@storybook/react';
import Rating from 'story/Rating';

storiesOf('Rating', module)
  .add('Static', () => (
    <Rating />
  ))
