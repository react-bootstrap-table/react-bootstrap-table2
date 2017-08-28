/* eslint import/no-unresolved: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Welcome from 'examples/welcome';
import BasicTable from 'examples/basic';

// css style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stories/stylesheet/storybook.scss';

storiesOf('Welcome', module)
  .add('react bootstrap table 2 ', () => <Welcome />);

storiesOf('Basic Table', module)
  .add('default', () => <BasicTable />);
