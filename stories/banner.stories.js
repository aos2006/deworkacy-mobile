import React from 'react';

import {storiesOf} from '@storybook/react';
import Banner from 'story/Banner';

storiesOf('Banner', module)
  .add('Default', () => (
    <Banner />
  ))
