# Documentation

## BootstrapTable Props

#### Required
* [keyField (**required**)](#keyField)
* [data (**required**)](#data)
* [columns (**required**)](#columns)

#### Optional
* [remote](#remote)
* [bootstrap4](#bootstrap4)
* [loading](#loading)
* [caption](#caption)
* [striped](#striped)
* [bordered](#bordered)
* [hover](#hover)
* [condensed](#condensed)
* [id](#id)
* [tabIndexCell](#tabIndexCell)
* [classes](#classes)
* [wrapperClasses](#wrapperClasses)
* [headerClasses](#headerClasses)
* [headerWrapperClasses](#headerWrapperClasses)
* [cellEdit](#cellEdit)
* [selectRow](#selectRow)
* [expandRow](#expandRow)
* [rowStyle](#rowStyle)
* [rowClasses](#rowClasses)
* [rowEvents](#rowEvents)
* [hiddenRows](#hiddenRows)
* [sort](#sort)
* [defaultSorted](#defaultSorted)
* [defaultSortDirection](#defaultSortDirection)
* [pagination](#pagination)
* [filter](#filter)
* [filterPosition](filterPosition)
* [onTableChange](#onTableChange)
* [onDataSizeChange](#onDataSizeChange)

### <a name='keyField'>keyField(**required**) - [String]</a>
Tells `react-bootstrap-table2` which column of the data is unique. This should be the name of a property that is unique for each item in your dataset

### <a name='data'>data(**required**) - [Array]</a>
Provides data for your table. It accepts a single Array object.

Each item in this array is an object that represents a row in the table. Each "Row" object should have a key-value pair for each column in the table, whose key matches that column's dataField value.

For example, if your column definitions look like:

```js
columns = [
  { dataField: 'id', text: 'Id' },
  { dataField: 'name', text: 'Name' },
  { dataField: 'animal', text: 'Animal' },
]
```

Then your data might look like:

```js
data = [
  { id: 1, name: 'George', animal: 'Monkey' }
  { id: 2, name: 'Jeffrey', animal: 'Giraffe' }
  { id: 3, name: 'Alice', animal: 'Giraffe' }
  { id: 4, name: 'Alice', animal: 'Tiger' }
]
```

And your "keyField" would be `id`

### <a name='columns'>columns(**required**) - [Object]</a>
Accepts a single Array object, please see [columns definition](./columns.md) for more detail.

### <a name='remote'>remote - [Bool | Object]</a>
Default is `false`, if enable`remote`, you are suppose to handle all the table change events, like: pagination, insert, filtering etc.
This is a chance that you can connect to your remote server or database to manipulate your data.   
For flexibility reason, you can control what functionality should be handled on remote via a object return:

```js
remote={ {
  filter: true,
  pagination: true,
  filter: true,
  sort: true,
  cellEdit: true
} }
```

In above case, only column filter will be handled on remote.

> Note: when remote is enable, you are suppose to give [`onTableChange`](#onTableChange) prop on `BootstrapTable`
> It's the only way to communicate to your remote server and update table states.

A special case for remote pagination:
```js
remote={ { pagination: true, filter: false, sort: false } }
```

There is a special case for remote pagination, even you only specified the pagination need to handle as remote, `react-bootstrap-table2` will handle all the table changes(filter, sort etc) as remote mode, because `react-bootstrap-table2` only know the data of current page, but filtering, searching or sort need to work on overall data.

### <a name='bootstrap4'>bootstrap4 - [Bool]</a>
`true` to indicate your bootstrap version is 4. Default version is 3.

### <a name='loading'>loading - [Bool]</a>
Telling if table is loading or not, for example: waiting data loading, filtering etc. It's **only** valid when [`remote`](#remote) is enabled.
When `loading` is `true`, `react-bootstrap-table2` will attend to render a overlay on table via [`overlay`](#overlay) prop, if [`overlay`](#overlay) prop is not given, `react-bootstrap-table2` will ignore the overlay rendering.

### <a name='overlay'>overlay - [Function]</a>
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

Actually, `react-bootstrap-table-overlay` is depends on [`react-loading-overlay`](https://github.com/derrickpelletier/react-loading-overlay) and `overlayFactory` just a factory function and you can pass any props which available for `react-loading-overlay`:

```js
overlay={
  overlayFactory({
    spinner: true,
    styles: {
      overlay: (base) => ({...base, background: 'rgba(255, 0, 0, 0.5)'})
    }
  })
}
```

### <a name='caption'>caption - [String | Node]</a>
Same as HTML [caption tag](https://www.w3schools.com/TAgs/tag_caption.asp), you can set it as String or a React JSX.

### <a name='striped'>striped - [Bool]</a>
Same as bootstrap `.table-striped` class for adding zebra-stripes to a table.
### <a name='bordered'>bordered - [Bool]</a>
Same as bootstrap `.table-bordered` class for adding borders to a table and table cells.
### <a name='hover'>hover - [Bool]</a>
Same as bootstrap `.table-hover` class for adding mouse hover effect (grey background color) on table rows.
### <a name='condensed'>condensed - [Bool]</a>
Same as bootstrap `.table-condensed` class for making a table more compact by cutting cell padding in half.

### <a name='id'>id - [String]</a>
Customize id on `table` element.

### <a name='tabIndexCell'>tabIndexCell - [Bool]</a>
Enable the `tabIndex` attribute on `<td>` element.

### <a name='classes'>classes - [String]</a>
Customize class on `table` element.

### <a name='wrapperClasses'>wrapperClasses - [String]</a>
Customize class on the outer element which wrap up the `table` element. 

### <a name='headerClasses'>headerClasses - [String]</a>
Customize class on the header row(`tr`). 

### <a name='headerWrapperClasses'>headerWrapperClasses - [String]</a>
Customize class on the `thead`. 

### <a name='cellEdit'>cellEdit - [Object]</a>
Makes table cells editable, please see [cellEdit definition](./cell-edit.md) for more detail.

### <a name='selectRow'>selectRow - [Object]</a>
Makes table rows selectable, please see [selectRow definition](./row-selection.md) for more detail.

### <a name='expandRow'>expandRow - [Object]</a>
Makes table rows expandable, please see [expandRow definition](./row-expand.md) for more detail.

### <a name='rowStyle'>rowStyle = [Object | Function]</a>
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

### <a name='rowClasses'>rowClasses = [String | Function]</a>
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

### <a name='rowEvents'>rowEvents - [Object]</a>
Custom the events on row:

```js
const rowEvents = {
  onClick: (e, row, rowIndex) => {
    ....
  }
};
<BootstrapTable data={ data } columns={ columns } rowEvents={ rowEvents } />
```

### <a name='hiddenRows'>hiddenRows - [Array]</a>
Hide rows, this props accept an array of row keys:

```js
const hiddenRows = [1, 4];
<BootstrapTable data={ data } columns={ columns } hiddenRows={ hiddenRows } />
```

### <a name='sort'>sort - [Object]</a>
Two cases you probably need to configure `sort` prop:

#### Manage sorting state
You can give `dataField` and `order` to specify the sorting state in table, For example

```js
<BootstrapTable sort={ { dataField: 'price', order: 'asc' } }>
```

#### One-time sorting configuration
In earily version, we only can configure [`sortCaret`](./columns.md#sortCaret) and [`sortFunc` ](./columns.md#sortFunc) per column. But they are same in most of cases.   
So here we give you a chance to just setup these prop in one time.

```js
<BootstrapTable sort={ {
  sortCaret: ...
  sortFunc: ...
} }>
```

### <a name='defaultSorted'>defaultSorted - [Array]</a>
`defaultSorted` accept an object array which allow you to define the default sort columns when first render.

```js
const defaultSorted = [{
  dataField: 'name', // if dataField is not match to any column you defined, it will be ignored.
  order: 'desc' // desc or asc
}];
```

**Note**: Only the first column is sorted currently, see #1083.

### <a name='defaultSortDirection'>defaultSortDirection - [String]</a>
Default sort direction when user click on header column at first time, available value is `asc` and `desc`. Default is `desc`.

### <a name='pagination'>pagination - [Object]</a>
`pagination` allow user to render a pagination panel on the bottom of table. But pagination functionality is separated from core of `react-bootstrap-table2` so that you are suppose to install `react-bootstrap-table2-paginator` additionally.

```sh
$ npm install react-bootstrap-table2-paginator --save
```

After installation of `react-bootstrap-table2-paginator`, you can enable pagination on `react-bootstrap-table2` easily:

```js
import paginator from 'react-bootstrap-table2-paginator';

// omit...

<BootstrapTable data={ data } columns={ columns } pagination={ paginator() } />
```

`paginator` is a function actually and allow to pass some pagination options, following we list all the available options:

```js
paginator({
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

### <a name='filter'>filter - [Object]</a>
`filter` allow user to filter data by column. However, filter functionality is separated from core of `react-bootstrap-table2` so that you are suppose to install `react-bootstrap-table2-filter` firstly.

```sh
$ npm install react-bootstrap-table2-filter --save
```

After installation of `react-bootstrap-table2-filter`, you can configure filter on `react-bootstrap-table2` easily:

```js
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

// omit...
const columns = [ {
  dataField: 'id', 
  text: 'Production ID'
}, {
  dataField: 'name',
  text: 'Production Name',
  filter: textFilter()  // apply text filter
}, {
  dataField: 'price',
  text: 'Production Price'
} ];
<BootstrapTable data={ data } columns={ columns } filter={ filterFactory() } />
```

### <a name='onTableChange'>onTableChange - [Function]</a>
This callback function will be called when [`remote`](#remote) enabled only.

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

### <a name='filterPosition'>filterPosition - [String]</a>
Available value is `inline`, `top` and `bottom`, default is `inline`. This prop decide where `react-bootstrap-table` render column filter.

### <a name='onDataSizeChange'>onDataSizeChange - [Function]</a>
This callback function will be called only when data size change by search/filter etc. This function have one argument which is an object contains below props:

* `dataSize`: The new data size

```js
handleDataChange = ({ dataSize }) => {
  this.setState({ rowCount: dataSize });
}

<BootstrapTable
  onDataSizeChange={ handleDataChange }
  ....
/>
```
