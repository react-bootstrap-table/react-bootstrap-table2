---
id: filter-props
title: Column Filter Props
---
`react-bootstrap-table2` separate the filter core code base to [react-bootstrap-table2-filter](https://www.npmjs.com/package/react-bootstrap-table2-filter). The following are guideline about how to use and the details of props of [filterFactory](#filterfactory-props) and [filters](#filters-props). For more information, please take refer to the samples as [link](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Column%20Filter&selectedStory=Text%20Filter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel) here.

## **Content Table**

* [Getting Started](#getting-started)
* [How to use](#how-to-use)
* [Props of FilterFactory](#props-of-filterfactory)
* [Props of Filters](#props-of-filters)
   * [textFilter](#textfilter)
   * [selectFilter](#selectFilter)
   * [numberFilter](#numberFilter)
* [Comparator](#comparator)

## **Getting Started**
```
$ npm install react-bootstrap-table2-filter --save
```
After installing `react-bootstrap-table2-filter`, you can configure `filter` on table as following instruction.

## **How to use**
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

## **Props of FilterFactory**
**No Any Available Props Yet**

## **Props of Filters**

## textFilter

**Required**: NONE

**Optional**:
### textFilter.placeholder - [String]
* custom the input placeholder

### textFilter.className - [String]
* custom class name on input

### textFilter.defaultValue - [String]
* default filtering value

### textFilter.comparator - [Comparator]
* Specify what kind of comparator to compare. Default is Comparator.LIKE

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

## selectFilter
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
* Specify what kind of comparator to compare. Default is `Comparator.EQ`

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

## numberFilter
**Required**: NONE

**Optional**:

### numberFilter.options - [Array]
* Once the `options` has been defined, it will render number `select` drop down instead of number input field.

### numberFilter.delay - [Number]
* Debounce time, which means how long will trigger filtering after user typing. Default is `500ms`.

### numberFilter.placeholder - [String]
* customized placeholder for number input.

### numberFilter.withoutEmptyComparatorOption - [Boolean]
* When it was set to `true`, the drop down list of `comparator` would hide the default selection.

### numberFilter.withoutEmptyNumberOption - [Boolean]
* When it was set to `true`, the drop down list of `number` would hide the default selection. Besides, before picking up this prop, please make sure that you've defined the `props.options` correctly.

### numberFilter.defaultValue - [Object]
* It is the default filtering value. Furthermore, it accepts **2** attributes:
   * number: filter value
   * comparator: what kind of comparator to compare

### numberFilter.comparator - [[Comparator]]
* Specify what kind of comparator to compare. Default is to list `all` of comparators.

### numberFilter.className - [String]
* custom class name on the `wrapper` of number input and comparator drop down.

### numberFilter.comparatorClassName - [String]
* custom class name on the `comparator` drop down.

### numberFilter.numberClassName - [String]
* custom class name on the number `input`.

### numberFilter.style - [Object]
* custom inline styles on the `wrapper` of number input and comparator drop down.

### numberFilter.comparatorStyle - [Object]
* custom inline styles on the `comparator` drop down.

### numberFilter.numberStyle - [Object]
* custom inline styles on the number `input`.

### numberFilter.getFilter - [Function]
* export `filter` function to allow users to access. For numberFilter,<br>`filter({ number, comparator })` to filter columns dynamically.

**Example**:
```js
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table2-filter';

const columns = [{ ... }, { ... }, {
  dataField: 'price',
  text: 'Product Price',
  filter: numberFilter({
    options: [2100, 2103, 2105],  // if options defined, will render number select instead of number input
    delay: 600, // how long will trigger filtering after user typing, default is 500 ms
    placeholder: 'custom placeholder',  // placeholder for number input
    withoutEmptyComparatorOption: true,  // dont render empty option for comparator
    withoutEmptyNumberOption: true,  // dont render empty option for number select if it is defined
    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],  // Custom the comparators
    style: { display: 'inline-grid' }, // custom the style on number filter
    className: 'custom-numberfilter-class',  // custom the class on number filter
    comparatorStyle: { backgroundColor: 'antiquewhite' }, // custom the style on comparator select
    comparatorClassName: 'custom-comparator-class',  // custom the class on comparator select
    numberStyle: { backgroundColor: 'cadetblue', margin: '0px' },  // custom the style on number input/select
    numberClassName: 'custom-number-class',  // custom the class on ber input/select
    defaultValue: { number: 2103, comparator: Comparator.GT },  // default value
    getFilter: (filter) => { // priceFilter was assigned once the component has been mounted.
      priceFilter = filter;
    }
  })
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

## **Comparator**
We support the following ways to do the comparison. Each `filter` has its default comparator. For more information, please take refer to the introduction of props above.

|   | Comparator      | Symbol | description             |
|---|-----------------|--------|-------------------------|
| 1 | Comparator.LIKE | N/A    | To include filter value |
| 2 | Comparator.EQ   | =      |                         |
| 3 | Comparator.NE   | !=     |                         |
| 4 | Comparator.GT   | >      |                         |
| 5 | Comparator.GE   | >=     |                         |
| 6 | Comparator.LT   | <      |                         |
| 7 | Comparator.LE   | <=     |                         |
