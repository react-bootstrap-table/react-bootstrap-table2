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

## FilterFactory Props
**No Any Available Props Yet**

## Filters Props

### Required
**NONE**

### Optional


