/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import React from 'react';
import { configure, addDecorator } from '@storybook/react';

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

addDecorator(componentDecorator);

configure(loadStories, module);
