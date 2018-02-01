# Migration Guide

* Please see the [CHANGELOG](https://react-bootstrap-table.github.io/react-bootstrap-table2/blog/2018/01/24/new-version-0.1.0.html) for `react-bootstrap-table2` first drop.
* Please see the [Roadmap](https://react-bootstrap-table.github.io/react-bootstrap-table2/blog/2018/01/24/release-plan.html)  for `react-bootstrap-table2` in 2018/Q1.
* Feel free to see the [offical docs](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/about.html), we list all the basic usage here!!

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
* [`react-bootstrap-table2-overlay`](https://www.npmjs.com/package/react-bootstrap-table2-overlay)
  * Overlay/Loading Addons

This can help your application with less bundled size and also help `react-bootstrap-table2` have clean design to avoid handling to much logic in kernal module(SRP). Hence, which means you probably need to install above addons when you need specific features.

## Core Table Migration

There is a big chagne is that there's no `TableHeaderColumn` in the `react-bootstrap-table2`, instead you are supposed to be define the `columns` prop on `BootstrapTable`: 

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

The `text` property is just same as the children for the `TableHeaderColumn`, if you want to custom the header, there's a new property is: [`headerFormatter`](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnheaderformatter-function).

* [`BootstrapTable` Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html)
* [Column Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html)

## Table Sort

Please see [Work with table sort](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-sort.html).   

- [x] Basic sorting
- [x] Custom sort function
- [x] Default Sort
- [x] Remote mode
- [x] Custom the sorting header
- [ ] Custom the sort caret
- [ ] Sort management
- [ ] Multi sort

Due to no `TableHeaderColumn` so that no `dataSort` here, please add [`sort`](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnsort-bool) property on column definitation.

## Row Selection

Please see [Work with selection](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-row-select.html).   
Please see [available selectRow configurations](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/row-select-props.html).   

No huge change for row selection, but can not custom the selection column currently. Coming soon!!!

## Column Filter

Please see [Work with column filter](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-filter.html).   
Please see [available filter configuration](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/filter-props.html).   

- [x] Text Filter
- [x] Custom Text Filter
- [x] Remote Filter
- [ ] Custom Filter Component
- [ ] Regex Filter
- [x] Select Filter
- [x] Custom Select Filter
- [ ] Number Filter
- [ ] Date Filter
- [ ] Array Filter
- [ ] Programmatically Filter

Remember to install [`react-bootstrap-table2-filter`](https://www.npmjs.com/package/react-bootstrap-table2-filter) firstly.   

Due to no `TableHeaderColumn` so that no `filter` here, please add [`filter`](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnfilter-object) property on column definitation and [`filter`](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html#filter-object) prop on `BootstrapTable`.

## Cell Edit

Please see [Work with cell edit](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-celledit.html).   
Please see [available cell edit configurations](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html).   

Remember to install [`react-bootstrap-table2-editor`](https://www.npmjs.com/package/react-bootstrap-table2-editor) firstly.   

No big changes for cell editing, [`validator`](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnvalidator-function) will not support the async call(Promise).

## Pagination

Please see [Work with pagination](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-pagination.html).   
Please see [available pagination configurations](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html).   

Remember to install [`react-bootstrap-table2-paginator`](https://www.npmjs.com/package/react-bootstrap-table2-paginator) firstly.   

No big changes for pagination, but still can't custom the pagination list, button and sizePerPage dropdown.

## Remote

> It's totally different in `react-bootstrap-table2`. Please [see](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-remote.html).