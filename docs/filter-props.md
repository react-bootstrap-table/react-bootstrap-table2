---
id: filter-props
title: Column Filter Props
---
`react-bootstrap-table2` separate the filter core code base to [react-bootstrap-table2-filter](https://www.npmjs.com/package/react-bootstrap-table2-filter). The following are guideline about how to use and the details of props of [filterFactory](#filterfactory-props) and [filters](#filters-props).

## Content Table

* [How to use](#how-to-use)
* [FilterFactory Props](#filterfactory-props)
* [Filters](#filters-props)
   * [textFilter](#1-textfilter)
   * [numberFilter](#2-numberFilter)
   * [selectFilter](#3-selectFilter)
* [Comparator](#comparator)

## How to use
You should apply following **2** to enable `filter` functionality for `react-bootstrap-table2`.
* `filterFactory`
* `filters` (**3** types support)
   * textFilter
   * numberFilter
   * selectFilter

```js
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: numberFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

## Props of FilterFactory
**No Any Available Props Yet**

## Props of Filters

## (1). textFilter

**Required**: NONE

**Optional**:
### textFilter.placeholder - [String]
* custom the input placeholder

### textFilter.className - [String]
* custom class name on input

### textFilter.defaultValue - [String]
* default filtering value

### textFilter.comparator - [Comparator]
* What kind of comparator to compare. Default is Comparator.LIKE

### textFilter.caseSensitive - [Boolean]
* default is `false`, and `true` will only work when comparator is `LIKE`.

### textFilter.style - [Object]
* your custom inline styles on `input`

### textFilter.delay - [Number]
* Debounce time, which means how long will trigger filtering after user typing. Default is `500ms`. 
### textFilter.getFilter - [Function]
* export `filter` function to allow users to access. For textFilter, `filter(value)` to filter columns dynamically.

**Examples**
```js
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
    className: 'my-custom-text-filter', // custom classname on input
    defaultValue: 'test', // default filtering value
    comparator: Comparator.EQ, // default is Comparator.LIKE
    caseSensitive: true, // default is false, and true will only work when comparator is LIKE
    style: { backgroundColor: 'yellow' }, // your custom inline styles on input
    delay: 1000, // how long will trigger filtering after user typing, default is 500 ms
    onClick: e => console.log(e),
    getFilter: (filter) => { // nameFilter was assigned once the component has been mounted.
      nameFilter = filter;
    }
  })
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

### (2). numberFilter
### (3). selectFilter
