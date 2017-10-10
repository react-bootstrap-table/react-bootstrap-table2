/* eslint import/no-unresolved: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';

// welcome
import Welcome from 'examples/welcome';
// basic
import BasicTable from 'examples/basic';
import BorderlessTable from 'examples/basic/borderless-table';
import StripHoverCondensedTable from 'examples/basic/striped-hover-condensed-table';
import NoDataTable from 'examples/basic/no-data-table';
import TableWithCaption from 'examples/basic/table-with-caption';

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
import ColumnAttrsTable from 'examples/columns/column-attrs-table';

// work on header columns
import HeaderColumnFormatTable from 'examples/header-columns/column-format-table';
import HeaderColumnAlignTable from 'examples/header-columns/column-align-table';
import HeaderColumnTitleTable from 'examples/header-columns/column-title-table';
import HeaderColumnEventTable from 'examples/header-columns/column-event-table';
import HeaderColumnClassTable from 'examples/header-columns/column-class-table';
import HeaderColumnStyleTable from 'examples/header-columns/column-style-table';
import HeaderColumnAttrsTable from 'examples/header-columns/column-attrs-table';

// table sort
import EnableSortTable from 'examples/sort/enable-sort-table';
import CustomSortTable from 'examples/sort/custom-sort-table';

// cell editing
import ClickToEditTable from 'examples/cell-edit/click-to-edit-table';
import DoubleClickToEditTable from 'examples/cell-edit/dbclick-to-edit-table';
import BlurToSaveTable from 'examples/cell-edit/blur-to-save-table';
import RowLevelEditableTable from 'examples/cell-edit/row-level-editable-table';
import ColumnLevelEditableTable from 'examples/cell-edit/column-level-editable-table';
import CellLevelEditable from 'examples/cell-edit/cell-level-editable-table';
import CellEditHooks from 'examples/cell-edit/cell-edit-hooks-table';
import CellEditValidator from 'examples/cell-edit/cell-edit-validator-table';

// css style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stories/stylesheet/tomorrow.min.css';
import 'stories/stylesheet/storybook.scss';
import 'react-bootstrap-table2/style/react-bootstrap-table.scss';

// import { action } from '@storybook/addon-actions';

// action('hello');
storiesOf('Welcome', module)
  .add('react bootstrap table 2 ', () => <Welcome />);

storiesOf('Basic Table', module)
  .add('basic table', () => <BasicTable />)
  .add('striped, hover, condensed table', () => <StripHoverCondensedTable />)
  .add('borderless table', () => <BorderlessTable />)
  .add('Indication For Empty Table', () => <NoDataTable />)
  .add('Table with caption', () => <TableWithCaption />);

storiesOf('Work on Columns', module)
  .add('Display Nested Data', () => <NestedDataTable />)
  .add('Column Formatter', () => <ColumnFormatTable />)
  .add('Column Formatter with Custom Data', () => <ColumnFormatExtraDataTable />)
  .add('Column Align', () => <ColumnAlignTable />)
  .add('Column Title', () => <ColumnTitleTable />)
  .add('Column Hidden', () => <ColumnHiddenTable />)
  .add('Column Event', () => <ColumnEventTable />)
  .add('Customize Column Class', () => <ColumnClassTable />)
  .add('Customize Column Style', () => <ColumnStyleTable />)
  .add('Customize Column HTML attribute', () => <ColumnAttrsTable />);

storiesOf('Work on Header Columns', module)
  .add('Column Formatter', () => <HeaderColumnFormatTable />)
  .add('Column Align', () => <HeaderColumnAlignTable />)
  .add('Column Title', () => <HeaderColumnTitleTable />)
  .add('Column Event', () => <HeaderColumnEventTable />)
  .add('Customize Column Class', () => <HeaderColumnClassTable />)
  .add('Customize Column Style', () => <HeaderColumnStyleTable />)
  .add('Customize Column HTML attribute', () => <HeaderColumnAttrsTable />);

storiesOf('Sort Table', module)
  .add('Enable Sort', () => <EnableSortTable />)
  .add('Custom Sort Fuction', () => <CustomSortTable />);

storiesOf('Cell Editing', module)
  .add('Click to Edit', () => <ClickToEditTable />)
  .add('DoubleClick to Edit', () => <DoubleClickToEditTable />)
  .add('Blur to Save Cell', () => <BlurToSaveTable />)
  .add('Row Level Editable', () => <RowLevelEditableTable />)
  .add('Column Level Editable', () => <ColumnLevelEditableTable />)
  .add('Cell Level Editable', () => <CellLevelEditable />)
  .add('Rich Hook Functions', () => <CellEditHooks />)
  .add('Validation', () => <CellEditValidator />);
