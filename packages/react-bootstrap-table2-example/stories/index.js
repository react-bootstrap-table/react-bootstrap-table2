/* eslint import/no-unresolved: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';

// welcome
import Welcome from 'examples/welcome';
// basic
import BasicTable from 'examples/basic';
import BorderlessTable from 'examples/basic/borderless-table';
import StripHoverCondensedTable from 'examples/basic/striped-hover-condensed-table';

// css style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stories/stylesheet/storybook.scss';

storiesOf('Welcome', module)
  .add('react bootstrap table 2 ', () => <Welcome />);

storiesOf('Basic Table', module)
  .add('basic table', () => <BasicTable />)
  .add('striped, hover, condensed table', () => <StripHoverCondensedTable />)
  .add('borderless table', () => <BorderlessTable />);
