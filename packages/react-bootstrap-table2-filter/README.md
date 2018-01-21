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
* **Coming soon!**

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
  style: { ... }, // your custom styles on input
  delay: 1000 // how long will trigger filtering after user typing, default is 500 ms
});

// omit...
```