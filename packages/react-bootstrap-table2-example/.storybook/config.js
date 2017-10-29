/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

function loadStories() {
  require('stories');
}

const styles = {
  margin: '15px',
};

const componentDecorator = (story) => (
  <div style={styles}>
    { story() }
  </div>
);


// prepend the story name to log messages
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addDecorator(componentDecorator);

configure(loadStories, module);
