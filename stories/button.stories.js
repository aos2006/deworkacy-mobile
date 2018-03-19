import React from 'react';

import {storiesOf} from '@storybook/react';
import Button from 'story/Button';

storiesOf('Buttons', module)
  .add('Default', () => (
    <Button>
      Default button
    </Button>
  ))
