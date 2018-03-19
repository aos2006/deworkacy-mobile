import React, {Component} from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo, setDefaults } from '@storybook/addon-info';
import ContextProvider from './ContextProvider';
import Layout from './Layout';

setDefaults({
  inline: true,
  source: true,
  header: true,
});

const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
};

addDecorator((story, context) => withInfo('common info')(story)(context));

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator(story => (
  <ContextProvider context={context}>
    <Layout>
      {story()}
    </Layout>
  </ContextProvider>
));

configure(loadStories, module);
