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
import CaptionTable from 'examples/basic/caption-table';

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
import HeaderColumnFormatWithSortFilterTable from 'examples/header-columns/column-format-filter-sort-table.js';
import HeaderColumnAlignTable from 'examples/header-columns/column-align-table';
import HeaderColumnTitleTable from 'examples/header-columns/column-title-table';
import HeaderColumnEventTable from 'examples/header-columns/column-event-table';
import HeaderColumnClassTable from 'examples/header-columns/column-class-table';
import HeaderColumnStyleTable from 'examples/header-columns/column-style-table';
import HeaderColumnAttrsTable from 'examples/header-columns/column-attrs-table';

// column filter
import TextFilter from 'examples/column-filter/text-filter';
import TextFilterWithDefaultValue from 'examples/column-filter/text-filter-default-value';
import TextFilterComparator from 'examples/column-filter/text-filter-eq-comparator';
import CustomTextFilter from 'examples/column-filter/custom-text-filter';
import CustomFilterValue from 'examples/column-filter/custom-filter-value';

// work on rows
import RowStyleTable from 'examples/rows/row-style';
import RowClassTable from 'examples/rows/row-class';
import RowEventTable from 'examples/rows/row-event';

// table sort
import EnableSortTable from 'examples/sort/enable-sort-table';
import DefaultSortTable from 'examples/sort/default-sort-table';
import CustomSortTable from 'examples/sort/custom-sort-table';
import HeaderSortingClassesTable from 'examples/sort/header-sorting-classes';
import HeaderSortingStyleTable from 'examples/sort/header-sorting-style';

// cell editing
import ClickToEditTable from 'examples/cell-edit/click-to-edit-table';
import DoubleClickToEditTable from 'examples/cell-edit/dbclick-to-edit-table';
import BlurToSaveTable from 'examples/cell-edit/blur-to-save-table';
import RowLevelEditableTable from 'examples/cell-edit/row-level-editable-table';
import ColumnLevelEditableTable from 'examples/cell-edit/column-level-editable-table';
import CellLevelEditable from 'examples/cell-edit/cell-level-editable-table';
import CellEditHooks from 'examples/cell-edit/cell-edit-hooks-table';
import CellEditValidator from 'examples/cell-edit/cell-edit-validator-table';
import CellEditStyleTable from 'examples/cell-edit/cell-edit-style-table';
import CellEditClassTable from 'examples/cell-edit/cell-edit-class-table';
import CellEditWithPromise from 'examples/cell-edit/cell-edit-with-promise-table';
import CellEditWithRedux from 'examples/cell-edit/cell-edit-with-redux-table';

// work on row selection
import SingleSelectionTable from 'examples/row-selection/single-selection';
import MultipleSelectionTable from 'examples/row-selection/multiple-selection';
import ClickToSelectTable from 'examples/row-selection/click-to-select';
import ClickToSelectWithCellEditTable from 'examples/row-selection/click-to-select-with-cell-edit';
import SelectionStyleTable from 'examples/row-selection/selection-style';
import SelectionClassTable from 'examples/row-selection/selection-class';
import NonSelectableRowsTable from 'examples/row-selection/non-selectable-rows';
import SelectionBgColorTable from 'examples/row-selection/selection-bgcolor';
import SelectionHooks from 'examples/row-selection/selection-hooks';
import HideSelectionColumnTable from 'examples/row-selection/hide-selection-column';

// pagination
import PaginationTable from 'examples/pagination';
import PaginationHooksTable from 'examples/pagination/pagination-hooks';
import CustomPaginationTable from 'examples/pagination/custom-pagination';

// loading overlay
import EmptyTableOverlay from 'examples/loading-overlay/empty-table-overlay';
import TableOverlay from 'examples/loading-overlay/table-overlay';

// remote
import RemoteSort from 'examples/remote/remote-sort';
import RemoteFilter from 'examples/remote/remote-filter';
import RemotePaginationTable from 'examples/remote/remote-pagination';
import RemoteAll from 'examples/remote/remote-all';

// css style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stories/stylesheet/tomorrow.min.css';
import 'stories/stylesheet/storybook.scss';
import 'react-bootstrap-table2/style/react-bootstrap-table.scss';
import 'react-bootstrap-table2-paginator/style/react-bootstrap-table-paginator.scss';

// import { action } from '@storybook/addon-actions';

// action('hello');
storiesOf('Welcome', module)
  .add('react bootstrap table 2 ', () => <Welcome />);

storiesOf('Basic Table', module)
  .add('basic table', () => <BasicTable />)
  .add('striped, hover, condensed table', () => <StripHoverCondensedTable />)
  .add('borderless table', () => <BorderlessTable />)
  .add('Indication For Empty Table', () => <NoDataTable />)
  .add('Table with caption', () => <CaptionTable />);

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
  .add('Column Format with Filter and Sort', () => <HeaderColumnFormatWithSortFilterTable />)
  .add('Column Align', () => <HeaderColumnAlignTable />)
  .add('Column Title', () => <HeaderColumnTitleTable />)
  .add('Column Event', () => <HeaderColumnEventTable />)
  .add('Customize Column Class', () => <HeaderColumnClassTable />)
  .add('Customize Column Style', () => <HeaderColumnStyleTable />)
  .add('Customize Column HTML attribute', () => <HeaderColumnAttrsTable />);

storiesOf('Column Filter', module)
  .add('Text Filter', () => <TextFilter />)
  .add('Text Filter with Default Value', () => <TextFilterWithDefaultValue />)
  .add('Text Filter with Comparator', () => <TextFilterComparator />)
  .add('Custom Text Filter', () => <CustomTextFilter />)
  // add another filter type example right here.
  .add('Custom Filter Value', () => <CustomFilterValue />);

storiesOf('Work on Rows', module)
  .add('Customize Row Style', () => <RowStyleTable />)
  .add('Customize Row Class', () => <RowClassTable />)
  .add('Row Event', () => <RowEventTable />);

storiesOf('Sort Table', module)
  .add('Enable Sort', () => <EnableSortTable />)
  .add('Default Sort Table', () => <DefaultSortTable />)
  .add('Custom Sort Fuction', () => <CustomSortTable />)
  .add('Custom Classes on Sorting Header Column', () => <HeaderSortingClassesTable />)
  .add('Custom Style on Sorting Header Column', () => <HeaderSortingStyleTable />);

storiesOf('Cell Editing', module)
  .add('Click to Edit', () => <ClickToEditTable />)
  .add('DoubleClick to Edit', () => <DoubleClickToEditTable />)
  .add('Blur to Save Cell', () => <BlurToSaveTable />)
  .add('Row Level Editable', () => <RowLevelEditableTable />)
  .add('Column Level Editable', () => <ColumnLevelEditableTable />)
  .add('Cell Level Editable', () => <CellLevelEditable />)
  .add('Rich Hook Functions', () => <CellEditHooks />)
  .add('Validation', () => <CellEditValidator />)
  .add('Custom Cell Style When Editing', () => <CellEditStyleTable />)
  .add('Custom Cell Classes When Editing', () => <CellEditClassTable />)
  .add('Async Cell Editing(Promise)', () => <CellEditWithPromise />)
  .add('Async Cell Editing(Redux)', () => <CellEditWithRedux />);

storiesOf('Row Selection', module)
  .add('Single Selection', () => <SingleSelectionTable />)
  .add('Multiple Selection', () => <MultipleSelectionTable />)
  .add('Click to Select', () => <ClickToSelectTable />)
  .add('Click to Select and Edit Cell', () => <ClickToSelectWithCellEditTable />)
  .add('Selection Style', () => <SelectionStyleTable />)
  .add('Selection Class', () => <SelectionClassTable />)
  .add('Selection Background Color', () => <SelectionBgColorTable />)
  .add('Not Selectabled Rows', () => <NonSelectableRowsTable />)
  .add('Selection Hooks', () => <SelectionHooks />)
  .add('Hide Selection Column', () => <HideSelectionColumnTable />);

storiesOf('Pagination', module)
  .add('Basic Pagination Table', () => <PaginationTable />)
  .add('Pagination Hooks', () => <PaginationHooksTable />)
  .add('Custom Pagination', () => <CustomPaginationTable />);

storiesOf('EmptyTableOverlay', module)
  .add('Empty Table Overlay', () => <EmptyTableOverlay />)
  .add('Table Overlay', () => <TableOverlay />);

storiesOf('Remote', module)
  .add('Remote Sort', () => <RemoteSort />)
  .add('Remote Filter', () => <RemoteFilter />)
  .add('Remote Pagination', () => <RemotePaginationTable />)
  .add('Remote All', () => <RemoteAll />);
