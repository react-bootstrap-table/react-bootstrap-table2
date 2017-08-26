/* eslint import/no-unresolved: 0 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import BasicTable from 'examples/basic/index.js';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Basic Table', module)
  .add('default', () => <BasicTable />);
