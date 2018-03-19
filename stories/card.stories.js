import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import Card  from 'story/Card';
import CardGrid from 'story/CardGrid';

storiesOf('Card', module)
  .add('Simple Card', () => (
    <Card
      name="Aiaiai TMA-1 Studio"
      brand="Headphones,Studio"
      price="$125"
      labelTxt="-20%"
      labelType="circle"
    />
  ))
  .add('Card Grid', () => (
    <CardGrid
      list={[
        {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: '-20%',
          labelType: 'tape',
        },
        {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: '-20%',
          labelType: 'tape',
        },
        {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: '-20%',
          labelType: 'tape',
        },
        {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: '-20%',
          labelType: 'tape',
        },
        {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: '-20%',
          labelType: 'tape',
        },
        {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: 'Out\nof\nStock',
          labelType: 'stock',
        },
        {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: 'New',
          labelType: 'tape',
        }
      ]}
    />
  ))
