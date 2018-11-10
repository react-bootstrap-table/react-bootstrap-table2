# react-bootstrap-table2-filter

`react-bootstrap-table2` separate the filter core code base to [`react-bootstrap-table2-filter`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-filter), so there's a little bit different when you use column filter than `react-bootstrap-table`. In the following, we are going to show you how to enable the column filter:

**[Live Demo For Column Filter](https://github.com/react-bootstrap-table/react-bootstrap-table2/blob/gh-pages-src/storybook/index.html?selectedKind=Column%20Filter)**

**[API&Props Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/filter-props.html)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-filter --save
```

You can get all types of filters via import and these filters are a factory function to create a individual filter instance. Currently, we support following filters:

* TextFilter
* SelectFilter
* MultiSelectFilter
* NumberFilter
* DateFilter
* CustomFilter
* **Coming soon!**

## Add CSS

```js
// es5 
require('react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css');

// es6
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
```

## Text Filter
Following is a quick demo for enable the column filter on **Product Price** column!!

```js
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

// omit...
const columns = [
  ..., {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

In addition, we preserve all of the filter features and functionality in legacy `react-bootstrap-table`, but in different way to do it:

```js
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
// omit...

const priceFilter = textFilter({
  placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
  className: 'my-custom-text-filter', // custom classname on input
  defaultValue: 'test', // default filtering value
  comparator: Comparator.EQ, // default is Comparator.LIKE
  caseSensitive: true, // default is false, and true will only work when comparator is LIKE
  style: { ... }, // your custom styles on input
  delay: 1000 // how long will trigger filtering after user typing, default is 500 ms
});

// omit...
```

## Select Filter
A quick example: 

```js
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

// omit...
const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

const columns = [
  ..., {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions
  })
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

Following is an example for custom select filter:

```js
import filterFactory, { selectFilter, Comparator } from 'react-bootstrap-table2-filter';
// omit...

const qualityFilter = selectFilter({
  options: selectOptions,
  placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
  className: 'my-custom-text-filter', // custom classname on input
  defaultValue: '2', // default filtering value
  comparator: Comparator.LIKE, // default is Comparator.EQ
  style: { ... }, // your custom styles on input
  withoutEmptyOption: true  // hide the default select option
});

// omit...
```

> Note, the selectOptions can be an array also: 

```js
const selectOptions = [
  { value: 0, label: 'good' },
  { value: 1, label: 'Bad' },
  { value: 2, label: 'unknown' }
];
const columns = [
  ..., {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions.find(opt => opt.value === cell).label,
  filter: selectFilter({
    options: selectOptions
  })
}];
```

The benifit is `react-bootstrap-table2` will render the select options by the order of array.

## MultiSelect Filter

A quick example: 

```js
import filterFactory, { multiSelectFilter } from 'react-bootstrap-table2-filter';

// omit...
const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

const columns = [
  ..., {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: multiSelectFilter({
    options: selectOptions
  })
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

Following is an example for custom select filter:

```js
import filterFactory, { multiSelectFilter, Comparator } from 'react-bootstrap-table2-filter';
// omit...

const qualityFilter = multiSelectFilter({
  options: selectOptions,
  placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
  className: 'my-custom-text-filter', // custom classname on input
  defaultValue: '2', // default filtering value
  comparator: Comparator.LIKE, // default is Comparator.EQ
  style: { ... }, // your custom styles on input
  withoutEmptyOption: true  // hide the default select option
});

// omit...
```

## Number Filter

```js
import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';

const columns = [..., {
  dataField: 'price',
  text: 'Product Price',
  filter: numberFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

Numner filter is same as other filter, you can custom the number filter via `numberFilter` factory function:

```js
import filterFactory, { selectFilter, Comparator, numberFilter } from 'react-bootstrap-table2-filter';
// omit...

const numberFilter = numberFilter({
  options: [2100, 2103, 2105],  // if options defined, will render number select instead of number input
  delay: 600,  // how long will trigger filtering after user typing, default is 500 ms
  placeholder: 'custom placeholder',  // placeholder for number input
  withoutEmptyComparatorOption: true,  // dont render empty option for comparator
  withoutEmptyNumberOption: true,  // dont render empty option for numner select if it is defined
  comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],  // Custom the comparators
  style: { display: 'inline-grid' },  // custom the style on number filter
  className: 'custom-numberfilter-class',  // custom the class on number filter
  comparatorStyle: { backgroundColor: 'antiquewhite' }, // custom the style on comparator select
  comparatorClassName: 'custom-comparator-class',  // custom the class on comparator select
  numberStyle: { backgroundColor: 'cadetblue', margin: '0px' },  // custom the style on number input/select
  numberClassName: 'custom-number-class',  // custom the class on ber input/select
  defaultValue: { number: 2103, comparator: Comparator.GT }  // default value
})

// omit...
```

## Date Filter

```js
import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';

const columns = [..., {
  dataField: 'date',
  text: 'Product date',
  filter: dateFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

> **Notes:** date filter accept a Javascript Date object in your raw data and you have to use `column.formatter` to make it as your prefer string result

Date filter is same as other filter, you can custom the date filter via `dateFilter` factory function:

```js
import filterFactory, { selectFilter, Comparator } from 'react-bootstrap-table2-filter';
// omit...

const dateFilter = dateFilter({
  delay: 600,  // how long will trigger filtering after user typing, default is 500 ms
  placeholder: 'custom placeholder',  // placeholder for date input
  withoutEmptyComparatorOption: true,  // dont render empty option for comparator
  comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],  // Custom the comparators
  style: { display: 'inline-grid' },  // custom the style on date filter
  className: 'custom-dateFilter-class',  // custom the class on date filter
  comparatorStyle: { backgroundColor: 'antiquewhite' }, // custom the style on comparator select
  comparatorClassName: 'custom-comparator-class',  // custom the class on comparator select
  dateStyle: { backgroundColor: 'cadetblue', margin: '0px' },  // custom the style on date input
  dateClassName: 'custom-date-class',  // custom the class on date input
  defaultValue: { date: new Date(2018, 0, 1), comparator: Comparator.GT }  // default value
})

// omit...
```

## Custom Filter

```js
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';

const columns = [..., {
  dataField: 'date',
  text: 'Product Name',
  filter: customFilter(),
  filterRenderer: (onFilter, column) => .....
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
```

In custom filter case, you are suppose to finish following two steps:
1. Call `customFilter` and pass to `column.filter`
2. Give `column.filterRenderer` as a callback function and return your custom filter element.

### column.filterRenderer

This function will pass two argument to you:
1. `onFilter`: call it to trigger filter when you need.
2. `column`: Just the column object!

In the end, please remember to return your custom filter element!

### customFilter

`customFilter` function just same as `textFilter`, `selectFilter` etc, it is for customization reason. However, in the custom filter case, there's only one props is valid: `type`


```js
import filterFactory, { FILTER_TYPES } from 'react-bootstrap-table2-filter';

const customFilter = customFilter({
  type: FILTER_TYPES.NUMBER,  // default is FILTER_TYPES.TEXT
})
```

`type` is a way to ask `react-bootstrap-table` to filter you data as number, select, date or normal text.

### FILTER_TYPES

Following properties is valid in `FILTER_TYPES`:
* TEXT
* SELECT
* NUMBER
* DATE
* MULTISELECT
