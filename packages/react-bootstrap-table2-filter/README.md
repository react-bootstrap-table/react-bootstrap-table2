# react-bootstrap-table2-filter

## Filters

* Text (`textFilter`)

You can get all of above filters via import and these filters are a factory function to create a individual filter instance.   
In addition, for some simple customization reasons, these factory function allow to pass some props.

### Text Filter

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

Following we list all the availabe props for `textFilter` function:

```js
import { Comparator } from 'react-bootstrap-table2-filter';
// omit...

const customTextFilter = textFilter({
  placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
  style: { ... }, // your custom styles on input
  className: 'my-custom-text-filter', // custom classname on input
  defaultValue: 'test', // default filtering value
  delay: 1000, // how long will trigger filtering after user typing, default is 500 ms
  comparator: Comparator.EQ // default is Comparator.LIKE
});
```