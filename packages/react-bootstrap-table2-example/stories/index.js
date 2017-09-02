/* eslint import/no-unresolved: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';

// welcome
import Welcome from 'examples/welcome';
// basic
import BasicTable from 'examples/basic';
import BorderlessTable from 'examples/basic/borderless-table';
import StripHoverCondensedTable from 'examples/basic/striped-hover-condensed-table';

// work on columns
import NestedDataTable from 'examples/columns/nested-data-table';
import ColumnFormatTable from 'examples/columns/column-format-table';
import ColumnFormatExtraDataTable from 'examples/columns/column-format-with-extra-data-table';
import ColumnClassTable from 'examples/columns/column-class-table';
import ColumnStyleTable from 'examples/columns/column-style-table';
import ColumnAlignTable from 'examples/columns/column-align-table';
import ColumnTitleTable from 'examples/columns/column-title-table';
import ColumnEventTable from 'examples/columns/column-event-table';
import ColumnHiddenTable from 'examples/columns/column-hidden-table';

// work on header columns
import HeaderColumnFormatTable from 'examples/header-columns/column-format-table';
import HeaderColumnAlignTable from 'examples/header-columns/column-align-table';
import HeaderColumnTitleTable from 'examples/header-columns/column-title-table';
import HeaderColumnEventTable from 'examples/header-columns/column-event-table';

// css style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stories/stylesheet/storybook.scss';

// import { action } from '@storybook/addon-actions';

// action('hello');
storiesOf('Welcome', module)
  .add('react bootstrap table 2 ', () => <Welcome />);

storiesOf('Basic Table', module)
  .add('basic table', () => <BasicTable />)
  .add('striped, hover, condensed table', () => <StripHoverCondensedTable />)
  .add('borderless table', () => <BorderlessTable />);

storiesOf('Work on Columns', module)
  .add('Display Nested Data', () => <NestedDataTable />)
  .add('Column Formatter', () => <ColumnFormatTable />)
  .add('Column Formatter with Custom Data', () => <ColumnFormatExtraDataTable />)
  .add('Column Align', () => <ColumnAlignTable />)
  .add('Column Title', () => <ColumnTitleTable />)
  .add('Column Hidden', () => <ColumnHiddenTable />)
  .add('Column Event', () => <ColumnEventTable />)
  .add('Customize Column Class', () => <ColumnClassTable />)
  .add('Customize Column Style', () => <ColumnStyleTable />);

storiesOf('Work on Header Columns', module)
  .add('Column Formatter', () => <HeaderColumnFormatTable />)
  .add('Column Align', () => <HeaderColumnAlignTable />)
  .add('Column Title', () => <HeaderColumnTitleTable />)
  .add('Column Event', () => <HeaderColumnEventTable />);
