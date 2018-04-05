---
id: filter-props
title: Column Filter Props
---
`react-bootstrap-table2` separate the filter core code base to [react-bootstrap-table2-filter](https://www.npmjs.com/package/react-bootstrap-table2-filter). The following are guideline about how to use and the details of props of [filterFactory](#filterfactory-props) and [filters](#filters-props). For more information, please take refer to the samples as [link](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Column%20Filter&selectedStory=Text%20Filter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel) here.

## Content Table

* [How to use](#how-to-use)
* [FilterFactory Props](#filterfactory-props)
* [Filters](#filters-props)
   * [textFilter](#1-textfilter)
   * [selectFilter](#2-selectFilter)
   * [numberFilter](#3-numberFilter)
* [Comparator](#comparator)

## How to use
You should apply following **2** to enable `filter` functionality for `react-bootstrap-table2`.
* `filterFactory`
* `filters` (**3** types support)
   * textFilter
   * selectFilter
   * numberFilter

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
  filter: textFilter()
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

**Example**
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

## (2). selectFilter
**Required**:

### selectFilter.options - [Object]
* (Required) the options for the list of drop down.

**Optional**:

### selectFilter.className - [String]
* custom class name on input

### selectFilter.withoutEmptyOption - [Boolean]
* When it was set to `true`, the drop down list would hide the default selection.
### selectFilter.defaultValue - [String]
* default filtering value

### selectFilter.comparator - [Comparator]
* What kind of comparator to compare. Default is `Comparator.EQ`

### selectFilter.style - [Object]
* your custom inline styles on `input`

### selectFilter.getFilter - [Function]
* export `filter` function to allow users to access. For selectFilter, `filter(value)` to filter columns dynamically.

**Example**
```js
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

const columns = [
  { ... }, { ... }, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    className: 'test-classname',
    withoutEmptyOption: true,
    defaultValue: 2,
    comparator: Comparator.LIKE, // default is Comparator.EQ
    style: { backgroundColor: 'pink' },
    getFilter: (filter) => { // qualityFilter was assigned once the component has been mounted.
      qualityFilter = filter;
    }
  })
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

## (3). numberFilter
