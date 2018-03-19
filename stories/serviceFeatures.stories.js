import React from 'react';

import {storiesOf} from '@storybook/react';
import ServiceFeatures from 'story/ServiceFeatures';

storiesOf('ServiceFeatures', module)
  .add('Default', () => (
    <ServiceFeatures />
  ))
