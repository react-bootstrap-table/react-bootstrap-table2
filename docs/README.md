# Documentation

## BootstrapTable Props

#### Required
* [keyField (**required**)](#keyField)
* [data (**required**)](#data)
* [columns (**required**)](#columns)

#### Optional
* [caption](#caption)
* [striped](#striped)
* [bordered](#bordered)
* [hover](#hover)
* [condensed](#condensed)
* [cellEdit](#cellEdit)
* [selectRow](#selectRow)
* [rowStyle](#rowStyle)
* [rowClasses](#rowClasses)
* [rowEvents](#rowEvents)
* [defaultSorted](#defaultSorted)
* [pagination](#pagination)

### <a name='keyField'>keyField(**required**) - [String]</a>
Tells `react-bootstrap-table2` which column is unique.

### <a name='data'>data(**required**) - [Array]</a>
Provides data for your table. It accepts a single Array object.

### <a name='columns'>columns(**required**) - [Object]</a>
Accepts a single Array object, please see [columns definition](./columns.md) for more detail.

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

### <a name='cellEdit'>cellEdit - [Object]</a>
Makes table cells editable, please see [cellEdit definition](./cell-edit.md) for more detail.

### <a name='selectRow'>selectRow - [Object]</a>
Makes table rows selectable, please see [selectRow definition](./row-selection.md) for more detail.

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
  onClick: (e) => {
    ....
  }
};
<BootstrapTable data={ data } columns={ columns } rowEvents={ rowEvents } />
```

### <a name='defaultSorted'>defaultSorted - [Array]</a>
`defaultSorted` accept an object array which allow you to define the default sort columns when first render.

```js
const defaultSorted = [{
  dataField: 'name', // if dataField is not match to any column you defined, it will be ignored.
  order: 'desc' // desc or asc
}];
```

### <a name='pagination'>pagination - [Object]</a>
`pagination` allow user to render a pagination panel on the bottom of table. But pagination funcitonality is separated from core of `react-bootstrap-table2` so that you are suppose to install `react-bootstrap-table2-paginator` additionaly.

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
  pageStartIndex: 0, // first page will be 0, default is 1
  paginationSize: 3,  // the pagination bar size, default is 5
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
  hideSizePerPage: true, // hide the size per page dorpdown
  hidePageListOnlyOnePage: true// hide pagination bar when only one page, default is false
})
```
