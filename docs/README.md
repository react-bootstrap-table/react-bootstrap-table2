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
* [sortedHeader](#sortedHeader)

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

### <a name='sortedHeader'>sortedHeader - [Object]</a>

`sortedHeader` allows you to customize `class` or `style` for `header cell` which is currently sorting. `sortedHeader` accepts two `attributes`, `classes` and `style`. 

* classes
* style

**sortedHeader.classes - [String | Function]**

Append customized classes for `header cell` which the table was sorting based on.

```js
sortedHeader = {
  classes: 'demo-sorted'
};
```

Furthermore, it also accepts a callback function which takes `2` arguments and `String` is expected to return:

```js
sortedHeader = {
  classes: function callback(column, colIndex) { ... }
}
```

* column: The value of current column.
* colIndex: The index of the current column being processed in BootstrapTable.

**sortedHeader.style - [Object | Function]**

It's similiar to `sortedHeader.classes`. It allow to customize style of `header cell` which is sorting based on. `Object` and `callback` function are acceptable. `callback` takes `2` arguments and an `Object` is expected to return:

```js
sortedHeader = {
  style: { backgroundColor: 'red' }
};
```
