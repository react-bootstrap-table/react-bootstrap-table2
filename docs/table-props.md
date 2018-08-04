---
id: table-props
title: BootstrapTable Props
---
## Required
* [keyField (**required**)](#keyfield-required-string)
* [data (**required**)](#data-required-array)
* [columns (**required**)](#columns-required-object)

## Optional
* [remote](#remote-bool-object)
* [bootstrap4](#bootstrap4-bool)
* [noDataIndication](#nodataindication-function)
* [loading](#loading-bool)
* [overlay](#overlay-function)
* [caption](#caption-string-node)
* [striped](#striped-bool)
* [bordered](#bordered-bool)
* [hover](#hover-bool)
* [condensed](#condensed-bool)
* [id](#id-string)
* [classes](#classes-string)
* [wrapperClasses](#wrapperClasses-string)
* [headerClasses](#headerClasses-string)
* [cellEdit](#celledit-object)
* [selectRow](#selectrow-object)
* [rowStyle](#rowstyle-object-function)
* [rowClasses](#rowclasses-string-function)
* [rowEvents](#rowevents-object)
* [defaultSorted](#defaultsorted-array)
* [defaultSortDirection](#defaultSortDirection-string)
* [pagination](#pagination-object)
* [filter](#filter-object)
* [onTableChange](#ontablechange-function)

-----

## keyField(**required**) - [String]
Tells `react-bootstrap-table2` which column is unique.

## data(**required**) - [Array]
Provides data for your table. It accepts a single Array object.

## columns(**required**) - [Object]
Accepts a single Array object, please see [columns definition](./column-props.html) for more detail.

## remote - [Bool | Object]
Default is `false`, if enable `remote`, you are supposed to be handle all the table change events, like: pagination, insert, filtering etc.
This is a chance that you can connect to your remote server or database to manipulate your data.   
For flexibility reason, you can control what functionality should be handled on remote via a object return:

```js
remote={ {
  filter: true,
  pagination: true,
  sort: true,
  cellEdit: true
} }
```

In above case, only column filter will be handled on remote.

> Note: when remote is enable, you are suppose to give [`onTableChange`](#ontablechange-function) prop on `BootstrapTable`
> It's the only way to communicate to your remote server and update table states.

A special case for remote pagination:
```js
remote={ { pagination: true, filter: false, sort: false } }
```

There is a special case for remote pagination, even you only specified the pagination need to handle as remote, `react-bootstrap-table2` will handle all the table changes(filter, sort etc) as remote mode, because `react-bootstrap-table2` only know the data of current page, but filtering, searching or sort need to work on overall data.

## bootstrap4 - [Bool]
`true` to indicate your bootstrap version is 4. Default version is 3.

## noDataIndication - [Function]
`noDataIndication` should be a callback function which return anything that will be showed in the table when data is **empty**.

## loading - [Bool]
Telling if table is loading or not, for example: waiting data loading, filtering etc. It's **only** valid when [`remote`](#remote-bool-object) is enabled.
When `loading` is `true`, `react-bootstrap-table2` will attend to render a overlay on table via [`overlay`](#overlay-function) prop, if [`overlay`](#overlay-function) prop is not given, `react-bootstrap-table2` will ignore the overlay rendering.

## overlay - [Function]
`overlay` accept a factory function which should returning a higher order component. By default, `react-bootstrap-table2-overlay` can be a good option for you:

```sh
$ npm install react-bootstrap-table2-overlay
```
```js
import overlayFactory from 'react-bootstrap-table2-overlay';

<BootstrapTable
  data={ data }
  columns={ columns }
  loading={ true }  //only loading is true, react-bootstrap-table will render overlay
  overlay={ overlayFactory() }
/>
```

Actually, `react-bootstrap-table2-overlay` is depends on [`react-loading-overlay`](https://github.com/derrickpelletier/react-loading-overlay) and `overlayFactory` just a factory function and you can pass any props which available for `react-loading-overlay`:

```js
overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
```

## caption - [String | Node]
Same as HTML [caption tag](https://www.w3schools.com/TAgs/tag_caption.asp), you can set it as String or a React JSX.

## striped - [Bool]
Same as bootstrap `.table-striped` class for adding zebra-stripes to a table.
## bordered - [Bool]
Same as bootstrap `.table-bordered` class for adding borders to a table and table cells.
## hover - [Bool]
Same as bootstrap `.table-hover` class for adding mouse hover effect (grey background color) on table rows.
## condensed - [Bool]
Same as bootstrap `.table-condensed` class for making a table more compact by cutting cell padding in half.

## id - [String]
Customize id on `table` element.
## classes - [String]
Customize class on `table` element.

## wrapperClasses - [String]
Customize class on the outer element which wrap up the `table` element.

## headerClasses - [String]
Customize class on the header row(`tr`).

## cellEdit - [Object]
Makes table cells editable, please see [cellEdit definition](./cell-edit-props.html) for more detail.

## selectRow - [Object]
Makes table rows selectable, please see [selectRow definition](./row-select-props.html) for more detail.

## rowStyle - [Object | Function]
Custom the style of table rows:

```js
<BootstrapTable data={ data } columns={ columns } rowStyle={ { backgroundColor: 'red' } } />
```

This prop also accept a callback function for flexible to custom row style:

```js
const rowStyle = (row, rowIndex) => {
  return { ... };
};

<BootstrapTable data={ data } columns={ columns } rowStyle={ rowStyle } />
```

## rowClasses - [String | Function]
Custom the style of table rows:

```js
<BootstrapTable data={ data } columns={ columns } rowClasses="custom-row-class" />
```

This prop also accept a callback function for flexible to custom row style:

```js
const rowClasses = (row, rowIndex) => {
  return 'custom-row-class';
};

<BootstrapTable data={ data } columns={ columns } rowClasses={ rowClasses } />
```

## rowEvents - [Object]
Custom the events on row:

```js
const rowEvents = {
  onClick: (e, row, rowIndex) => {
    ....
  }
};
<BootstrapTable data={ data } columns={ columns } rowEvents={ rowEvents } />
```

## defaultSorted - [Array]
`defaultSorted` accept an object array which allow you to define the default sort columns when first render.

```js
const defaultSorted = [{
  dataField: 'name', // if dataField is not match to any column you defined, it will be ignored.
  order: 'desc' // desc or asc
}];
```

## defaultSortDirection - [String]
Default sort direction when user click on header column at first time, available value is `asc` and `desc`. Default is `desc`.

## pagination - [Object]
`pagination` allow user to render a pagination panel on the bottom of table. But pagination functionality is separated from core of `react-bootstrap-table2` so that you are suppose to install `react-bootstrap-table2-paginator` additionally.

```sh
$ npm install react-bootstrap-table2-paginator --save
```

After installation of `react-bootstrap-table2-paginator`, you can enable pagination on `react-bootstrap-table2` easily:

```js
import paginationFactory from 'react-bootstrap-table2-paginator';

// omit...

<BootstrapTable data={ data } columns={ columns } pagination={ paginationFactory() } />
```

`paginationFactory` is a function actually and allow to pass some pagination options, following we list all the available options:

```js
paginationFactory({
  page, // Specify the current page. It's necessary when remote is enabled
  sizePerPage, // Specify the size per page. It's necessary when remote is enabled
  totalSize, // Total data size. It's necessary when remote is enabled
  pageStartIndex: 0, // first page will be 0, default is 1
  paginationSize: 3,  // the pagination bar size, default is 5
  showTotal: true, // display pagination information
  sizePerPageList: [ {
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: 'All', value: products.length
  } ], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
  withFirstAndLast: false, // hide the going to first and last page button
  alwaysShowAllBtns: true, // always show the next and previous page button
  firstPageText: 'First', // the text of first page button
  prePageText: 'Prev', // the text of previous page button
  nextPageText: 'Next', // the text of next page button
  lastPageText: 'Last', // the text of last page button
  nextPageTitle: 'Go to next', // the title of next page button
  prePageTitle: 'Go to previous', // the title of previous page button
  firstPageTitle: 'Go to first', // the title of first page button
  lastPageTitle: 'Go to last', // the title of last page button
  hideSizePerPage: true, // hide the size per page dropdown
  hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
  onPageChange: (page, sizePerPage) => {}, // callback function when page was changing
  onSizePerPageChange: (sizePerPage, page) => {}, // callback function when page size was changing
  paginationTotalRenderer: (from, to, size) => { ... }  // custom the pagination total
})
```

## filter - [Object]
`filter` allows users to filter data by columns. For more information, please navigate to [filter-props](./filter-props.html).

**Getting Started**
```
$ npm install react-bootstrap-table2-filter --save
```

After installing `react-bootstrap-table2-filter`, you could easily enable the functionality of `filter`.

**Example**
```js
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter() // apply text filter
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

## onTableChange - [Function]
This callback function will be called when [`remote`](#remote-bool-object) enabled only.

```js
const onTableChange = (type, newState) => {
  // handle any data change here
}
<BootstrapTable data={ data } columns={ columns } onTableChange={ onTableChange } />
```

There's only two arguments will be passed to `onTableChange`: `type` and `newState`:

`type` is tell you what kind of functionality to trigger this table's change: available values at the below:

* `filter`
* `pagination`
* `sort`
* `cellEdit`

Following is a shape of `newState`

```js
{
  page,  // newest page
  sizePerPage,  // newest sizePerPage
  sortField,  // newest sort field
  sortOrder,  // newest sort order
  filters, // an object which have current filter status per column
  data, // when you enable remote sort, you may need to base on data to sort if data is filtered/searched
  cellEdit: {  // You can only see this prop when type is cellEdit
    rowId,
    dataField,
    newValue
  }
}
```
