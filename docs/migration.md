---
id: migration
title: Migration
sidebar_label: Migration
---

## Migration Guide

* Please see the [CHANGELOG](https://react-bootstrap-table.github.io/react-bootstrap-table2/blog/2018/01/24/new-version-0.1.0.html) for `react-bootstrap-table2` first drop.
* Feel free to see the [official docs](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/about.html), we list all the basic usage here!!

## Preface

Currently, **I still can't implement all the mainly features in legacy `react-bootstrap-table`**, so please watch our github repo or [blog](https://react-bootstrap-table.github.io/react-bootstrap-table2/blog/) to make sure the legacy features you wanted are already implemented on `react-bootstrap-table2`. Anyway, ask me by open issue is ok.   

-----

`react-bootstrap-table2` separate some functionalities from core modules to other modules like following:

* [`react-bootstrap-table-next`](https://www.npmjs.com/package/react-bootstrap-table-next)
  * Core table module, include sorting and row selection
* [`react-bootstrap-table2-filter`](https://www.npmjs.com/package/react-bootstrap-table2-filter)
  * Column filter Addons
* [`react-bootstrap-table2-editor`](https://www.npmjs.com/package/react-bootstrap-table2-editor)
  * Cell Editing Addons
* [`react-bootstrap-table2-paginator`](https://www.npmjs.com/package/react-bootstrap-table2-paginator)
  * Pagination Addons
* [`react-bootstrap-table2-toolkit`](https://www.npmjs.com/package/react-bootstrap-table2-toolkit)
  * Table Search
  * CSV Export
  * Column Toggle
* [`react-bootstrap-table2-overlay`](https://www.npmjs.com/package/react-bootstrap-table2-overlay)
  * Overlay/Loading Addons

This can help your application with less bundled size and also help `react-bootstrap-table2` have clean design to avoid handling to much logic in kernel module(SRP). Hence, which means you probably need to install above addons when you need specific features.

## Core Table Migration

There is a big change is that there's no `TableHeaderColumn` in the `react-bootstrap-table2`, instead you are supposed to be define the `columns` prop on `BootstrapTable`: 

```js
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
```

The `text` property is just same as the children for the `TableHeaderColumn`, if you want to custom the header, there's a new property is: [`headerFormatter`](./column-props.html#columnheaderformatter-function).

* [`BootstrapTable` Definition](./table-props.html)
* [Column Definition](./column-props.html)

## Table Sort

Please see [Work with table sort](./basic-sort.html).   

- [v] Basic sorting
- [v] Custom sort function
- [v] Default Sort
- [v] Remote mode
- [v] Custom the sorting header
- [v] Sort event listener
- [ ] Custom the sort caret
- [ ] Sort management
- [ ] Multi sort

Due to no `TableHeaderColumn` so that no `dataSort` here, please add [`sort`](./column-props.html#columnsort-bool) property on column definition.

## Row Selection

Please see [Work with selection](./basic-row-select.html).   
Please see [available selectRow configurations](./row-select-props.html).   

No huge changes in row selection.

## Column Filter

Please see [Work with column filter](./basic-filter.html).   
Please see [available filter configuration](./filter-props.html).   

- [v] Text Filter
- [v] Remote Filter
- [v] Custom Filter Component
- [ ] Regex Filter
- [v] Select Filter
- [v] Number Filter
- [v] Date Filter
- [v] Array Filter
- [v] Programmatically Filter

Remember to install [`react-bootstrap-table2-filter`](https://www.npmjs.com/package/react-bootstrap-table2-filter) firstly.   

Due to no `TableHeaderColumn` so that no `filter` here, please add [`filter`](./column-props.html#columnfilter-object) property on column definition and [`filter`](./table-props.html#filter-object) prop on `BootstrapTable`.

## Cell Edit

Please see [Work with cell edit](./basic-celledit.html).   
Please see [available cell edit configurations](./cell-edit-props.html).   

Remember to install [`react-bootstrap-table2-editor`](https://www.npmjs.com/package/react-bootstrap-table2-editor) firstly.   

No big changes for cell editing, [`validator`](./column-props.html#columnvalidator-function) will not support the async call(Promise).

## Pagination

Please see [Work with pagination](./basic-pagination.html).   
Please see [available pagination configurations](./pagination-props.html).   

Remember to install [`react-bootstrap-table2-paginator`](https://www.npmjs.com/package/react-bootstrap-table2-paginator) firstly.   

In newest `react-bootstrap-table2-paginator@2.0.0`, we allow you to custom any part of pagination component more flexible.

## Table Search
Please see [Work with table search](./basic-search.html).   
Please see [Search configurations](./search-props.html).   

The usage of search functionality is a little bit different from legacy search. The mainly different thing is developer have to render the search input field, we do believe it will be very flexible for all the developers who want to custom the search position or search field itself.

- [v] Custom search component and position
- [v] Custom search value
- [v] Clear search
- [ ] Multiple search
- [ ] Strict search

## Row Expand
Please see [Work with expandable row](./basic-row-expand.html).   
Please see [Row expand configurations](./row-expand-props.html).   

- [v] Expand Row Events
- [v] Expand Row Indicator
- [v] Expand Row Management
- [v] Custom Expand Row Indicators
- [v] Compatiable with Row Selection
- [v] Expand Column position
- [v] Expand Column Style/Class

## Export CSV
Please see [Work with export to CSV](./basic-export-csv.html).   
Please see [Export CSV configurations](./export-csv-props.html).   

Export CSV functionality is like search, which is one of functionality in the `react-bootstrap-table2-toolkit`. All of the legacy functions we already implemented.

## Remote

> It's totally different in `react-bootstrap-table2`. Please [see](./basic-remote.html).


## Row insert/Delete
Not support yet

## Keyboard Navigation
Not support yet