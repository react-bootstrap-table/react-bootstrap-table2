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
import CustomizedIdClassesTable from 'examples/basic/customized-id-classes';
import CaptionTable from 'examples/basic/caption-table';
import LargeTable from 'examples/basic/large-table';
import ExposedAPITable from 'examples/basic/exposed-function';
import TabIndexCellTable from 'examples/basic/tabindex-column';

// bootstrap 4
import Bootstrap4DefaultSortTable from 'examples/bootstrap4/sort';
import Bootstrap4CaptionTable from 'examples/bootstrap4/caption-table';
import Bootstrap4RowSelectionTable from 'examples/bootstrap4/row-selection';
import Bootstrap4PaginationTable from 'examples/bootstrap4/pagination';
import Bootstrap4ColumnToggleTable from 'examples/bootstrap4/column-toggle';
import ToolkitsTable from 'examples/bootstrap4/toolkits';

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
import DummyColumnTable from 'examples/columns/dummy-column-table';
import RowExpandWithFormattedDummyColumn from 'examples/columns/row-expand-with-formatted-dummy-column.js';

// work on header columns
import HeaderColumnFormatTable from 'examples/header-columns/column-format-table';
import HeaderColumnFormatWithSortFilterTable from 'examples/header-columns/column-format-filter-sort-table.js';
import HeaderColumnAlignTable from 'examples/header-columns/column-align-table';
import HeaderColumnTitleTable from 'examples/header-columns/column-title-table';
import HeaderColumnEventTable from 'examples/header-columns/column-event-table';
import HeaderColumnClassTable from 'examples/header-columns/column-class-table';
import HeaderColumnStyleTable from 'examples/header-columns/column-style-table';
import HeaderColumnAttrsTable from 'examples/header-columns/column-attrs-table';
import HeaderClassTable from 'examples/header-columns/header-class-table';

// footer
import SimpleFooter from 'examples/footer/simple-footer';
import FunctionFooter from 'examples/footer/function-footer';
import FooterClassTable from 'examples/footer/footer-class-table';
import FooterColumnFormatTable from 'examples/footer/column-format-table';
import FooterColumnAlignTable from 'examples/footer/column-align-table';
import FooterColumnTitleTable from 'examples/footer/column-title-table.js';
import FooterColumnEventsTable from 'examples/footer/column-event-table.js';
import FooterColumnClassTable from 'examples/footer/column-class-table.js';
import FooterColumnStyleTable from 'examples/footer/column-style-table.js';
import FooterColumnAttrsTable from 'examples/footer/column-attrs-table.js';

// column filter
import TextFilter from 'examples/column-filter/text-filter';
import TextFilterWithDefaultValue from 'examples/column-filter/text-filter-default-value';
import TextFilterComparator from 'examples/column-filter/text-filter-eq-comparator';
import TextFilterCaseSensitive from 'examples/column-filter/text-filter-caseSensitive';
import CustomTextFilter from 'examples/column-filter/custom-text-filter';
import CustomFilterValue from 'examples/column-filter/custom-filter-value';
import SelectFilter from 'examples/column-filter/select-filter';
import ConfigureSelectFilterOptions from 'examples/column-filter/select-filter-option-type';
import SelectFilterWithDefaultValue from 'examples/column-filter/select-filter-default-value';
import SelectFilterComparator from 'examples/column-filter/select-filter-like-comparator';
import SelectFilterWithPreservedOptionsOrder from 'examples/column-filter/select-filter-preserve-option-order';
import CustomSelectFilter from 'examples/column-filter/custom-select-filter';
import MultiSelectFilter from 'examples/column-filter/multi-select-filter';
import MultiSelectFilterDefaultValue from 'examples/column-filter/multi-select-filter-default-value';
import CustomMultiSelectFilter from 'examples/column-filter/custom-multi-select-filter';
import NumberFilter from 'examples/column-filter/number-filter';
import NumberFilterWithDefaultValue from 'examples/column-filter/number-filter-default-value';
import CustomNumberFilter from 'examples/column-filter/custom-number-filter';
import DateFilter from 'examples/column-filter/date-filter';
import DateFilterWithDefaultValue from 'examples/column-filter/date-filter-default-value';
import CustomDateFilter from 'examples/column-filter/custom-date-filter';
import ProgrammaticallyTextFilter from 'examples/column-filter/programmatically-text-filter';
import ProgrammaticallySelectFilter from 'examples/column-filter/programmatically-select-filter';
import ProgrammaticallyNumberFilter from 'examples/column-filter/programmatically-number-filter';
import ProgrammaticallyDateFilter from 'examples/column-filter/programmatically-date-filter';
import ProgrammaticallyMultiSelectFilter from 'examples/column-filter/programmatically-multi-select-filter';
import CustomFilter from 'examples/column-filter/custom-filter';
import AdvanceCustomFilter from 'examples/column-filter/advance-custom-filter';
import ClearAllFilters from 'examples/column-filter/clear-all-filters';
import FilterHooks from 'examples/column-filter/filter-hooks';
import CustomFilterLogic from 'examples/column-filter/custom-filter-logic';
import FilterPosition from 'examples/column-filter/filter-position';

// work on rows
import RowStyleTable from 'examples/rows/row-style';
import RowClassTable from 'examples/rows/row-class';
import RowEventTable from 'examples/rows/row-event';
import RowHiddenTable from 'examples/rows/row-hidden';

// table sort
import EnableSortTable from 'examples/sort/enable-sort-table';
import DefaultSortTable from 'examples/sort/default-sort-table';
import DefaultSortDirectionTable from 'examples/sort/default-sort-direction';
import SortEvents from 'examples/sort/sort-events';
import SortManagement from 'examples/sort/sort-management';
import OneTimeSortConfiguration from 'examples/sort/one-time-sort-configuration';
import CustomSortValue from 'examples/sort/custom-sort-value';
import CustomSortTable from 'examples/sort/custom-sort-table';
import CustomSortCaretTable from 'examples/sort/custom-sort-caret';
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
import AsyncCellEditHooks from 'examples/cell-edit/cell-edit-async-hooks-table';
import CellEditValidator from 'examples/cell-edit/cell-edit-validator-table';
import AsyncCellEditValidator from 'examples/cell-edit/cell-edit-async-validator-table';
import CellEditStyleTable from 'examples/cell-edit/cell-edit-style-table';
import CellEditClassTable from 'examples/cell-edit/cell-edit-class-table';
import AutoSelectTextInput from 'examples/cell-edit/auto-select-text-input-table';
import EditorStyleTable from 'examples/cell-edit/editor-style-table';
import EditorClassTable from 'examples/cell-edit/editor-class-table';
import DBClickEditWithSelection from 'examples/cell-edit/dbclick-to-edit-with-selection-table';
import DropdownEditorTable from 'examples/cell-edit/dropdown-editor-table';
import DropdownEditorWithDynamicOptionsTable from 'examples/cell-edit/dropdown-editor-with-dynamic-options-table';
import TextareaEditorTable from 'examples/cell-edit/textarea-editor-table';
import CheckboxEditorTable from 'examples/cell-edit/checkbox-editor-table';
import DateEditorTable from 'examples/cell-edit/date-editor-table';
import CustomEditorTable from 'examples/cell-edit/custom-editor-table';
import CellEditorWithDataType from 'examples/cell-edit/cell-edit-with-data-type';

// work on row selection
import SingleSelectionTable from 'examples/row-selection/single-selection';
import MultipleSelectionTable from 'examples/row-selection/multiple-selection';
import ClickToSelectTable from 'examples/row-selection/click-to-select';
import DefaultSelectTable from 'examples/row-selection/default-select';
import SelectionManagement from 'examples/row-selection/selection-management';
import AdvanceSelectionManagement from 'examples/row-selection/selection-advance-management';
import ClickToSelectWithCellEditTable from 'examples/row-selection/click-to-select-with-cell-edit';
import SelectionWithExpansionTable from 'examples/row-selection/selection-with-expansion';
import SelectionNoDataTable from 'examples/row-selection/selection-no-data';
import SelectionStyleTable from 'examples/row-selection/selection-style';
import SelectionClassTable from 'examples/row-selection/selection-class';
import HeaderStyleTable from 'examples/row-selection/header-style';
import HideSelectAllTable from 'examples/row-selection/hide-select-all';
import CustomSelectionTable from 'examples/row-selection/custom-selection';
import NonSelectableRowsTable from 'examples/row-selection/non-selectable-rows';
import NonSelectableRowsStyleTable from 'examples/row-selection/non-selectable-rows-style';
import NonSelectableRowsClassTable from 'examples/row-selection/non-selectable-rows-class';
import SelectionBgColorTable from 'examples/row-selection/selection-bgcolor';
import SelectionHooks from 'examples/row-selection/selection-hooks';
import HideSelectionColumnTable from 'examples/row-selection/hide-selection-column';
import SelectionColumnStyleTable from 'examples/row-selection/select-column-style';
import SelectionColumnPositionTable from 'examples/row-selection/selection-column-position';

// work on row expand
import BasicRowExpand from 'examples/row-expand';
import RowExpandManagement from 'examples/row-expand/expand-management';
import NonExpandableRows from 'examples/row-expand/non-expandable-rows';
import ExpandColumn from 'examples/row-expand/expand-column';
import OnlyExpandByColumn from 'examples/row-expand/expand-by-column-only.js';
import ExpandOnlyOne from 'examples/row-expand/expand-only-one';
import CustomExpandColumn from 'examples/row-expand/custom-expand-column';
import ExpandColumnPosition from 'examples/row-expand/expand-column-position';
import ExpandHooks from 'examples/row-expand/expand-hooks';
import ParentRowClassName from 'examples/row-expand/parent-row-classname';
import ExpandingRowClassName from 'examples/row-expand/expanding-row-classname';

// pagination
import PaginationTable from 'examples/pagination';
import PaginationHooksTable from 'examples/pagination/pagination-hooks';
import PaginationWithDynamicData from 'examples/pagination/pagination-with-dynamic-data';
import CustomPaginationTable from 'examples/pagination/custom-pagination';
import CustomPageButtonTable from 'examples/pagination/custom-page-button';
import CustomSizePerPageOptionTable from 'examples/pagination/custom-size-per-page-option';
import CustomSizePerPageTable from 'examples/pagination/custom-size-per-page';
import CustomPageListTable from 'examples/pagination/custom-page-list';
import StandalonePaginationList from 'examples/pagination/standalone-pagination-list';
import StandaloneSizePerPage from 'examples/pagination/standalone-size-per-page';
import StandalonePaginationTotal from 'examples/pagination/standalone-pagination-total';
import FullyCustomPaginationTable from 'examples/pagination/fully-custom-pagination';
import RemoteStandalonePaginationTable from 'examples/pagination/remote-standalone-pagination';
import CustomePaginationWithFilter from 'examples/pagination/custome-page-list-with-filter';
import CustomePaginationWithSearch from 'examples/pagination/custom-page-list-with-search';

// search
import SearchTable from 'examples/search';
import ClearSearchButton from 'examples/search/clear-search-button';
import DefaultSearch from 'examples/search/default-search';
import DefaultCustomSearch from 'examples/search/default-custom-search';
import FullyCustomSearch from 'examples/search/fully-custom-search';
import SearchFormattedData from 'examples/search/search-formatted';
import CustomSearchValue from 'examples/search/custom-search-value';
import SearchableColumn from 'examples/search/searchable-column';
import CustomMatchFunction from 'examples/search/custom-match-function';

// CSV
import ExportCSV from 'examples/csv';
import CSVFormatter from 'examples/csv/csv-column-formatter';
import CustomCSVHeader from 'examples/csv/custom-csv-header';
import HideCSVColumn from 'examples/csv/hide-column';
import ExportOnlySelected from 'examples/csv/export-only-selected';
import ExportOnlyFiltered from 'examples/csv/export-only-filtered';
import CSVColumnType from 'examples/csv/csv-column-type';
import CustomCSVButton from 'examples/csv/custom-csv-button';
import ExportCustomData from 'examples/csv/export-custom-data';
import CustomCSV from 'examples/csv/custom-csv';
import ExportTableFooter from 'examples/csv/export-footer';

// Column toggle
import BasicColumnToggle from 'examples/column-toggle';
import DefaultVisibility from 'examples/column-toggle/default-visibility';
import StylingColumnToggle from 'examples/column-toggle/styling-toggle-list';
import CustomToggleList from 'examples/column-toggle/custom-toggle-list';
import ColumnToggleWithFilter from 'examples/column-toggle/column-toggle-with-filter';

// loading overlay
import EmptyTableOverlay from 'examples/loading-overlay/empty-table-overlay';
import TableOverlay from 'examples/loading-overlay/table-overlay';

// remote
import RemoteSort from 'examples/remote/remote-sort';
import RemoteFilter from 'examples/remote/remote-filter';
import RemotePaginationTable from 'examples/remote/remote-pagination';
import RemoteSearch from 'examples/remote/remote-search';
import RemoteCellEdit from 'examples/remote/remote-celledit';
import RemoteAll from 'examples/remote/remote-all';

// data
import DataChangeListener from 'examples/data/data-change-listener';
import LoadDataWithFilter from 'examples/data/load-data-on-the-fly-with-filter';
import LoadDataWithDefaultFilter from 'examples/data/load-data-on-the-fly-with-default-filter';
import LoadDataWithSearch from 'examples/data/load-data-on-the-fly-with-search';
import LoadDataWithDefaultSearch from 'examples/data/load-data-on-the-fly-with-default-search';
import LoadDataWithPaginationAndFilter from 'examples/data/load-data-on-the-fly-with-pagination-and-filter';

// css style
import 'stories/stylesheet/tomorrow.min.css';
import 'stories/stylesheet/storybook.scss';
import '../../react-bootstrap-table2/style/react-bootstrap-table2.scss';
import '../../react-bootstrap-table2-paginator/style/react-bootstrap-table2-paginator.scss';
import '../../react-bootstrap-table2-filter/style/react-bootstrap-table2-filter.scss';
import '../../react-bootstrap-table2-toolkit/style/react-bootstrap-table2-toolkit.scss';

// import bootstrap style by given version
import bootstrapStyle, { BOOTSTRAP_VERSION } from './bootstrap-style';

storiesOf('Welcome', module).add('react bootstrap table 2 ', () => <Welcome />);

storiesOf('Basic Table', module)
  .addDecorator(bootstrapStyle())
  .add('basic table', () => <BasicTable />)
  .add('striped, hover, condensed table', () => <StripHoverCondensedTable />)
  .add('borderless table', () => <BorderlessTable />)
  .add('Indication For Empty Table', () => <NoDataTable />)
  .add('Customized id and class table', () => <CustomizedIdClassesTable />)
  .add('Table with caption', () => <CaptionTable />)
  .add('Large Table', () => <LargeTable />)
  .add('Exposed API', () => <ExposedAPITable />)
  .add('Enable tabIndex on Cell', () => <TabIndexCellTable />);

storiesOf('Bootstrap 4', module)
  .addDecorator(bootstrapStyle(BOOTSTRAP_VERSION.FOUR))
  .add('Sort table with bootstrap 4', () => <Bootstrap4DefaultSortTable />)
  .add('Table Caption bootstrap 4', () => <Bootstrap4CaptionTable />)
  .add('Row selection table with bootstrap 4', () => <Bootstrap4RowSelectionTable />)
  .add('Pagination table with bootstrap 4', () => <Bootstrap4PaginationTable />)
  .add('Column Toggle with bootstrap 4', () => <Bootstrap4ColumnToggleTable />)
  .add('toolkits Table bootstrap 4', () => <ToolkitsTable />);

storiesOf('Work on Columns', module)
  .addDecorator(bootstrapStyle())
  .add('Display Nested Data', () => <NestedDataTable />)
  .add('Column Formatter', () => <ColumnFormatTable />)
  .add('Column Formatter with Custom Data', () => <ColumnFormatExtraDataTable />)
  .add('Column Align', () => <ColumnAlignTable />)
  .add('Column Title', () => <ColumnTitleTable />)
  .add('Column Hidden', () => <ColumnHiddenTable />)
  .add('Column Event', () => <ColumnEventTable />)
  .add('Customize Column Class', () => <ColumnClassTable />)
  .add('Customize Column Style', () => <ColumnStyleTable />)
  .add('Customize Column HTML attribute', () => <ColumnAttrsTable />)
  .add('Dummy Column', () => <DummyColumnTable />)
  .add('Row Expand with Dummy Column Formatter', () => <RowExpandWithFormattedDummyColumn />);

storiesOf('Work on Header Columns', module)
  .addDecorator(bootstrapStyle())
  .add('Column Formatter', () => <HeaderColumnFormatTable />)
  .add('Column Format with Filter and Sort', () => <HeaderColumnFormatWithSortFilterTable />)
  .add('Column Align', () => <HeaderColumnAlignTable />)
  .add('Column Title', () => <HeaderColumnTitleTable />)
  .add('Column Event', () => <HeaderColumnEventTable />)
  .add('Customize Column Class', () => <HeaderColumnClassTable />)
  .add('Customize Column Style', () => <HeaderColumnStyleTable />)
  .add('Customize Column HTML attribute', () => <HeaderColumnAttrsTable />)
  .add('Header Class', () => <HeaderClassTable />);

storiesOf('Column Filter', module)
  .addDecorator(bootstrapStyle())
  .add('Text Filter', () => <TextFilter />)
  .add('Text Filter with Default Value', () => <TextFilterWithDefaultValue />)
  .add('Text Filter with Comparator', () => <TextFilterComparator />)
  .add('Text Filter with Case Sensitive', () => <TextFilterCaseSensitive />)
  // add another filter type example right here.
  .add('Select Filter', () => <SelectFilter />)
  .add('Configure Select Filter Options', () => <ConfigureSelectFilterOptions />)
  .add('Select Filter with Default Value', () => <SelectFilterWithDefaultValue />)
  .add('Select Filter with Comparator', () => <SelectFilterComparator />)
  .add('MultiSelect Filter', () => <MultiSelectFilter />)
  .add('MultiSelect Filter with Default Value', () => <MultiSelectFilterDefaultValue />)
  .add('Number Filter', () => <NumberFilter />)
  .add('Number Filter with Default Value', () => <NumberFilterWithDefaultValue />)
  .add('Date Filter', () => <DateFilter />)
  .add('Date Filter with Default Value', () => <DateFilterWithDefaultValue />)
  .add('Filter Position', () => <FilterPosition />)
  .add('Custom Text Filter', () => <CustomTextFilter />)
  .add('Custom Select Filter', () => <CustomSelectFilter />)
  .add('Custom Number Filter', () => <CustomNumberFilter />)
  .add('Custom Date Filter', () => <CustomDateFilter />)
  .add('Custom MultiSelect Filter', () => <CustomMultiSelectFilter />)
  .add('Custom Filter Value', () => <CustomFilterValue />)
  .add('Programmatically Text Filter', () => <ProgrammaticallyTextFilter />)
  .add('Programmatically Select Filter', () => <ProgrammaticallySelectFilter />)
  .add('Programmatically Number Filter', () => <ProgrammaticallyNumberFilter />)
  .add('Programmatically Date Filter', () => <ProgrammaticallyDateFilter />)
  .add('Programmatically Multi Select Filter', () => <ProgrammaticallyMultiSelectFilter />)
  .add('Custom Filter', () => <CustomFilter />)
  .add('Advance Custom Filter', () => <AdvanceCustomFilter />)
  .add('Preserved Option Order on Select Filter', () => <SelectFilterWithPreservedOptionsOrder />)
  .add('Clear All Filters', () => <ClearAllFilters />)
  .add('Filter Hooks', () => <FilterHooks />)
  .add('Implement custom filter logic', () => <CustomFilterLogic />);

storiesOf('Work on Rows', module)
  .addDecorator(bootstrapStyle())
  .add('Customize Row Style', () => <RowStyleTable />)
  .add('Customize Row Class', () => <RowClassTable />)
  .add('Hide Rows', () => <RowHiddenTable />)
  .add('Row Event', () => <RowEventTable />);

storiesOf('Footer', module)
  .addDecorator(bootstrapStyle())
  .add('Simple Footer', () => <SimpleFooter />)
  .add('Function Footer', () => <FunctionFooter />)
  .add('Column Formatter', () => <FooterColumnFormatTable />)
  .add('Column Align', () => <FooterColumnAlignTable />)
  .add('Column Title', () => <FooterColumnTitleTable />)
  .add('Column Events', () => <FooterColumnEventsTable />)
  .add('Customize Column Class', () => <FooterColumnClassTable />)
  .add('Customize Column Style', () => <FooterColumnStyleTable />)
  .add('Customize Column HTML attribute', () => <FooterColumnAttrsTable />)
  .add('Footer Class', () => <FooterClassTable />);

storiesOf('Sort Table', module)
  .addDecorator(bootstrapStyle())
  .add('Enable Sort', () => <EnableSortTable />)
  .add('Default Sort Table', () => <DefaultSortTable />)
  .add('Default Sort Direction Table', () => <DefaultSortDirectionTable />)
  .add('Sort Events', () => <SortEvents />)
  .add('Sort Management', () => <SortManagement />)
  .add('One-time Sort Configuation', () => <OneTimeSortConfiguration />)
  .add('Custom Sort Value', () => <CustomSortValue />)
  .add('Custom Sort Fuction', () => <CustomSortTable />)
  .add('Custom Sort Caret', () => <CustomSortCaretTable />)
  .add('Custom Classes on Sorting Header Column', () => <HeaderSortingClassesTable />)
  .add('Custom Style on Sorting Header Column', () => <HeaderSortingStyleTable />);

storiesOf('Cell Editing', module)
  .addDecorator(bootstrapStyle())
  .add('Click to Edit', () => <ClickToEditTable />)
  .add('DoubleClick to Edit', () => <DoubleClickToEditTable />)
  .add('Blur to Save Cell', () => <BlurToSaveTable />)
  .add('Row Level Editable', () => <RowLevelEditableTable />)
  .add('Column Level Editable', () => <ColumnLevelEditableTable />)
  .add('Cell Level Editable', () => <CellLevelEditable />)
  .add('Rich Hook Functions', () => <CellEditHooks />)
  .add('Async Hook Functions', () => <AsyncCellEditHooks />)
  .add('Validation', () => <CellEditValidator />)
  .add('Async Validation', () => <AsyncCellEditValidator />)
  .add('Auto Select Text Input', () => <AutoSelectTextInput />)
  .add('Custom Cell Style', () => <CellEditStyleTable />)
  .add('Custom Cell Classes', () => <CellEditClassTable />)
  .add('Custom Editor Classes', () => <EditorClassTable />)
  .add('Custom Editor Style', () => <EditorStyleTable />)
  .add('DoubleClick to Edit with Selection', () => <DBClickEditWithSelection />)
  .add('Dropdown Editor', () => <DropdownEditorTable />)
  .add('Dropdown Editor with Dynamic Options', () => <DropdownEditorWithDynamicOptionsTable />)
  .add('Textarea Editor', () => <TextareaEditorTable />)
  .add('Checkbox Editor', () => <CheckboxEditorTable />)
  .add('Date Editor', () => <DateEditorTable />)
  .add('Custom Editor', () => <CustomEditorTable />)
  .add('Cell Editor with Data Type', () => <CellEditorWithDataType />);

storiesOf('Row Selection', module)
  .addDecorator(bootstrapStyle())
  .add('Single Selection', () => <SingleSelectionTable />)
  .add('Multiple Selection', () => <MultipleSelectionTable />)
  .add('Click to Select', () => <ClickToSelectTable />)
  .add('Default Select', () => <DefaultSelectTable />)
  .add('Selection Management', () => <SelectionManagement />)
  .add('Advance Selection Management', () => <AdvanceSelectionManagement />)
  .add('Click to Select and Edit Cell', () => <ClickToSelectWithCellEditTable />)
  .add('Row Select and Expand', () => <SelectionWithExpansionTable />)
  .add('Selection without Data', () => <SelectionNoDataTable />)
  .add('Selection Style', () => <SelectionStyleTable />)
  .add('Selection Class', () => <SelectionClassTable />)
  .add('Custom Selection Column Header Style', () => <HeaderStyleTable />)
  .add('Hide Select All', () => <HideSelectAllTable />)
  .add('Custom Selection', () => <CustomSelectionTable />)
  .add('Selection Background Color', () => <SelectionBgColorTable />)
  .add('Not Selectabled Rows', () => <NonSelectableRowsTable />)
  .add('Not Selectabled Rows Style', () => <NonSelectableRowsStyleTable />)
  .add('Not Selectabled Rows Class', () => <NonSelectableRowsClassTable />)
  .add('Selection Hooks', () => <SelectionHooks />)
  .add('Hide Selection Column', () => <HideSelectionColumnTable />)
  .add('Custom Selection Column Style', () => <SelectionColumnStyleTable />)
  .add('Selection Column Position', () => <SelectionColumnPositionTable />);

storiesOf('Row Expand', module)
  .addDecorator(bootstrapStyle())
  .add('Basic Row Expand', () => <BasicRowExpand />)
  .add('Expand Management', () => <RowExpandManagement />)
  .add('Non Expandabled Rows', () => <NonExpandableRows />)
  .add('Expand Indicator', () => <ExpandColumn />)
  .add('Only Expand by Indicator', () => <OnlyExpandByColumn />)
  .add('Expand Only One Row at The Same Time', () => <ExpandOnlyOne />)
  .add('Custom Expand Indicator', () => <CustomExpandColumn />)
  .add('Expand Column Position', () => <ExpandColumnPosition />)
  .add('Expand Hooks', () => <ExpandHooks />)
  .add('Custom Parent Row ClassName', () => <ParentRowClassName />)
  .add('Custom Expanding Row ClassName', () => <ExpandingRowClassName />);

storiesOf('Pagination', module)
  .addDecorator(bootstrapStyle())
  .add('Basic Pagination Table', () => <PaginationTable />)
  .add('Pagination Hooks', () => <PaginationHooksTable />)
  .add('Pagination with Dynamic Data', () => <PaginationWithDynamicData />)
  .add('Custom Pagination', () => <CustomPaginationTable />)
  .add('Custom Page Button', () => <CustomPageButtonTable />)
  .add('Custom Page List', () => <CustomPageListTable />)
  .add('Custom SizePerPage Option', () => <CustomSizePerPageOptionTable />)
  .add('Custom SizePerPage', () => <CustomSizePerPageTable />)
  .add('Standalone Pagination List', () => <StandalonePaginationList />)
  .add('Standalone SizePerPage Dropdown', () => <StandaloneSizePerPage />)
  .add('Standalone Pagination Total', () => <StandalonePaginationTotal />)
  .add('Fully Custom Pagination', () => <FullyCustomPaginationTable />)
  .add('Remote Fully Custom Pagination', () => <RemoteStandalonePaginationTable />)
  .add('Custom Pagination with Filter', () => <CustomePaginationWithFilter />)
  .add('Custom Pagination with Search', () => <CustomePaginationWithSearch />);

storiesOf('Table Search', module)
  .addDecorator(bootstrapStyle())
  .add('Basic Search Table', () => <SearchTable />)
  .add('Clear Search Button', () => <ClearSearchButton />)
  .add('Default Search Table', () => <DefaultSearch />)
  .add('Default Custom Search', () => <DefaultCustomSearch />)
  .add('Searchable Column', () => <SearchableColumn />)
  .add('Fully Custom Search', () => <FullyCustomSearch />)
  .add('Search Formatted Value', () => <SearchFormattedData />)
  .add('Custom Search Value', () => <CustomSearchValue />)
  .add('Custom match function', () => <CustomMatchFunction />);

storiesOf('Column Toggle', module)
  .addDecorator(bootstrapStyle())
  .add('Basic Column Toggle', () => <BasicColumnToggle />)
  .add('Default Visibility', () => <DefaultVisibility />)
  .add('Styling Column Toggle', () => <StylingColumnToggle />)
  .add('Custom Column Toggle', () => <CustomToggleList />)
  .add('Column Toggle with Filter', () => <ColumnToggleWithFilter />);

storiesOf('Export CSV', module)
  .addDecorator(bootstrapStyle())
  .add('Basic Export CSV', () => <ExportCSV />)
  .add('Format CSV Column', () => <CSVFormatter />)
  .add('Custom CSV Header', () => <CustomCSVHeader />)
  .add('Hide CSV Column', () => <HideCSVColumn />)
  .add('Only Export Selected Rows', () => <ExportOnlySelected />)
  .add('Only Export Filtered/Searched Rows', () => <ExportOnlyFiltered />)
  .add('CSV Column Type', () => <CSVColumnType />)
  .add('Custom CSV Button', () => <CustomCSVButton />)
  .add('Export Custom Data', () => <ExportCustomData />)
  .add('Custom CSV', () => <CustomCSV />)
  .add('Export Table Footer', () => <ExportTableFooter />);

storiesOf('EmptyTableOverlay', module)
  .addDecorator(bootstrapStyle())
  .add('Empty Table Overlay', () => <EmptyTableOverlay />)
  .add('Table Overlay', () => <TableOverlay />);

storiesOf('Remote', module)
  .addDecorator(bootstrapStyle())
  .add('Remote Sort', () => <RemoteSort />)
  .add('Remote Filter', () => <RemoteFilter />)
  .add('Remote Pagination', () => <RemotePaginationTable />)
  .add('Remote Search', () => <RemoteSearch />)
  .add('Remote Cell Editing', () => <RemoteCellEdit />)
  .add('Remote All', () => <RemoteAll />);

storiesOf('Data', module)
  .addDecorator(bootstrapStyle())
  .add('Data Change Listener', () => <DataChangeListener />)
  .add('Load data with Filter', () => <LoadDataWithFilter />)
  .add('Load data with Default Filter', () => <LoadDataWithDefaultFilter />)
  .add('Load data with Search', () => <LoadDataWithSearch />)
  .add('Load data with Default Search', () => <LoadDataWithDefaultSearch />)
  .add('Load data with Filter and Pagination', () => <LoadDataWithPaginationAndFilter />);
