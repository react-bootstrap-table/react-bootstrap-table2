---
id: column-props
title: Columns Props
---

Definition of columns props on BootstrapTable

## Required
* [dataField (**required**)](#columndatafield-required-string)
* [text (**required**)](#columntext-required-string)

## Optional
* [hidden](#columnhidden-bool)
* [formatter](#columnformatter-function)
* [formatExtraData](#columnformatextradata-any)
* [sort](#columnsort-bool)
* [sortFunc](#columnsortfunc-function)
* [onSort](#columnonsort-function)
* [classes](#columnclasses-string-function)
* [style](#columnstyle-object-function)
* [title](#columntitle-bool-function)
* [events](#columnevents-object)
* [align](#columnalign-string-function)
* [attrs](#columnattrs-object-function)
* [headerFormatter](#columnheaderformatter-function)
* [headerClasses](#columnheaderclasses-string-function)
* [headerStyle](#columnheaderstyle-object-function)
* [headerTitle](#columnheadertitle-bool-function)
* [headerEvents](#columnheaderevents-object)
* [headerAlign](#columnheaderalign-string-function)
* [headerAttrs](#columnheaderattrs-object-function)
* [headerSortingClasses](#headersortingclasses-string-function)
* [headerSortingStyle](#headersortingstyle-object-function)
* [editable](#columneditable-bool-function)
* [validator](#columnvalidator-function)
* [editCellStyle](#columneditcellstyle-object-function)
* [editCellClasses](#columneditcellclasses-string-function)
* [editorStyle](#columneditorstyle-object-function)
* [editorClasses](#columneditorclasses-string-function)
* [editor](#columneditor-object)
* [editorRenderer](#columneditorrenderer-function)
* [filter](#columnfilter-object)
* [filterValue](#columnfiltervalue-function)
* [csvType](#columncsvType-object)
* [csvFormatter](#columncsvFormatter-function)
* [csvText](#columncsvText-string)
* [csvExport](#columncsvExport-bool)

-----

## column.dataField (**required**) - [String]
Use `dataField` to specify what field should be apply on this column. If your raw data is nested, for example:

```js
const row = {
  id: 'A001',
  address: {
    postal: '1234-12335',
    city: 'Chicago'
  }
}
```
You can use `dataField` with dot(`.`) to describe nested object:

```js
dataField: 'address.postal'
dataField: 'address.city'
```

## column.text (**required**) - [String]
`text` will be the column text in header column by default, if your header is not only text or you want to customize the header column, please check [`column.headerFormatter`](#columnheaderformatter-function)

## column.hidden - [Bool]
`hidden` allow you to hide column when `true` given.

## column.formatter - [Function]
`formatter` allow you to customize the table column and only accept a callback function which take four arguments and a JSX/String are expected for return.

* `cell`
* `row`
* `rowIndex`
* [`formatExtraData`](#columnformatextradata-any)

## column.headerFormatter - [Function]
`headerFormatter` allow you to customize the header column and only accept a callback function which take three arguments and a JSX/String are expected for return.

* `column`: current column object itself
* `colIndex`: index of current column
* `components`: an object which contain all of other react element, like sort caret or filter etc.

The third argument: `components` have following specified properties:
```js
{
  sortElement, // sort caret element, it will not be undefined when you enable sort on this column
  filterElement // filter element, it will not be undefined when you enable column.filter on this column
}
```

## column.formatExtraData - [Any]
It's only used for [`column.formatter`](#columnformatter-function), you can define any value for it and will be passed as fourth argument for [`column.formatter`](#columnformatter-function) callback function.

## column.sort - [Bool]
Enable the column sort via a `true` value given.

## column.sortFunc - [Function]
`column.sortFunc` only work when `column.sort` is enable. `sortFunc` allow you to define your sorting algorithm. This callback function accept four arguments:

```js
{
  // omit...
  sort: true,
  sortFunc: (a, b, order, dataField) => {
    if (order === 'asc') return a - b;
    else return b - a;
  }
}
```
> The possible value of `order` argument is **`asc`** and **`desc`**.

## column.onSort - [Function]
`column.onSort` is an event listener for subscribing the event of sort:

```js
{
  // omit...
  sort: true,
  onSort: (field, order) => {
    // ....
  }
}
```

## column.classes - [String | Function]
It's available to have custom class on table column:

```js
{
  // omit...
  classes: 'id-custom-cell'
}
```
In addition, `classes` also accept a callback function which have more power to custom the css class on each columns. This callback function take **4** arguments and a `String` is expected to return: 


```js
{
  classes: function callback(cell, row, rowIndex, colIndex) { ... }
}
```

**Parameters**
* `cell`: The value of current cell. 
* `row`: The value of `row` being processed in the `BootstrapTable`.
* `rowIndex`: The index of the current `row` being processed in the `BootstrapTable`.
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `String` will be the result as element class.

## column.headerClasses - [String | Function]
It's similar to [`column.classes`](#columnclasses-string-function), `headerClasses` is available to have customized class on table header column:

```js
{
  // omit...
  headerClasses: 'id-custom-cell'
}
```
Furthermore, it also accept a callback function which takes 2 arguments and a `String` is expect to return:

```js
{
  headerClasses: function callback(column, colIndex) { ... }
}
```

**Parameters**
* `column`: The value of current column. 
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `String` will be the result of element headerClasses.

## column.style - [Object | Function]
It's available to have custom style on table column:

```js
{
  // omit...
  style: { backgroundColor: 'green' }
}
```

In addition, similar to [`column.classes`](#columnclasses-string-function), `style` also accept a callback function which have more power to customize the `inline style` on each columns. This callback function takes **4** arguments and an `Object` is expect to return: 


```js
{
  style: function callback(cell, row, rowIndex, colIndex) { ... }
}
```

**Parameters**
* `cell`: The value of current cell. 
* `row`: The value of `row` being processed in the `BootstrapTable`.
* `rowIndex`: The index of the current `row` being processed in the `BootstrapTable`.
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `Object` will be the result of element style.


## column.headerStyle - [Object | Function]
It's available to have customized inline-style on table header column:

```js
{
  // omit...
  headerStyle: { backgroundColor: 'green' }
}
```

Moreover, it also accept a callback function which takes 2 arguments and an `Object` is expect to return:

```js
{
  headerStyle: function callback(column, colIndex) { ... }
}
```

**Parameters**
* `column`: The value of current column. 
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `Object` will be the result of element headerStyle.


## column.title - [Bool | Function]
`react-bootstrap-table2` is disable [`HTML title`](https://www.w3schools.com/tags/tag_title.asp) as default. You can assign `title` as `true` to enable the HTML title on table column and take `cell content` as default value. Additionally, you could customize title via a callback. It takes **4** arguments and a `String` is expect to return: 


```js
{
  // omit...
  title: function callback(cell, row, rowIndex, colIndex) { ... }
  // return custom title here
}
```

**Parameters**
* `cell`: The value of current cell. 
* `row`: The value of `row` being processed in the `BootstrapTable`.
* `rowIndex`: The index of the current `row` being processed in the `BootstrapTable`.
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `String` will be the result of element title.

## column.headerTitle - [Bool | Function]
`headerTitle` is only for the title on header column, default is disable. The usage almost same as [`column.title`](#columntitle-bool-function), 

```js
{
  // omit...
  headerTitle: true
}
```

It's also available to custom via a callback function:
```js
{
  headerTitle: function callback(column, colIndex) { ... }
}
```

**Parameters**
* `column`: The value of current column. 
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `String` will be the result of element headerTitle.

## column.align - [String | Function]
You can configure the [CSS text-align](https://www.w3schools.com/cssref/pr_text_text-align.asp) for table column by `align` property. 

Besides, `align` also accept a callback function for dynamically setting text align. It takes **4** arguments and a `String` is expect to return: 

```js
{
  // omit...
  align: function callback(cell, row, rowIndex, colIndex) { ... }
}
```

**Parameters**
* `cell`: The value of current cell. 
* `row`: The value of `row` being processed in the `BootstrapTable`.
* `rowIndex`: The index of the current `row` being processed in the `BootstrapTable`.
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `String` will be the result of element text alignment.

## column.headerAlign - [String | Function]
It's almost same as [`column.align`](#columnalign-string-function), but it's for the [CSS text-align](https://www.w3schools.com/cssref/pr_text_text-align.asp) on header column. 

```js
{
  // omit...
  headerAlign: 'center'
}
```

Also, you can custom the align by a callback function:

```js
{
  // omit...
  headerAlign: (column, colIndex) => {
    // column is an object and perform itself
    // return custom title here
  }
}
```
**Parameters**
* `column`: The value of current column. 
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `String` will be the result of element headerAlign.


## column.events - [Object]
You can assign any [HTML Event](https://www.w3schools.com/tags/ref_eventattributes.asp) on table column via event property:

```js
{
  // omit...
  events: {
    onClick: e => { ... }
  }
}
```

## column.headerEvents - [Object]
`headerEvents` same as [`column.events`](#columnevents-object) but this is for header column.

```js
{
  // omit...
  headerEvents: {
    onClick: e => { ... }
  }
}
```

## column.attrs - [Object | Function]
Via `attrs` property, You can customize table column [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) which allow user to configure the elements or adjust their behavior.

```js
{
  // omit...
  attrs: {
    title: 'bar',
    'data-test': 'foo'
  }
}
```
Not only `Object`, `callback function` is also acceptable. It takes **4** arguments and an `Object` is expect to return: 

```js
{
  attrs: function callback(cell, row, rowIndex, colIndex) { ... }
}
```

**Parameters**
* `cell`: The value of current cell. 
* `row`: The value of `row` being processed in the `BootstrapTable`.
* `rowIndex`: The index of the current `row` being processed in the `BootstrapTable`.
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `Object` will be the result of element HTML attributes.

> Caution:   
> If `column.classes`, `column.style`, `column.title`, `column.hidden` or `column.align` was given at the same time, property `attrs` has lower priority and it will be overwritten:

```js
{
  // omit...
  title: true, // get higher priority
  attrs: { title: 'test' }
}
```

## column.headerAttrs - [Object | Function]
`headerAttrs` is similar to [`column.attrs`](#columnattrs-object-function) but it works for header column. 
```js
{
  // omit...
  headerAttrs: {
    title: 'bar',
    'data-test': 'foo'
  }
}
```

Additionally, customize the header attributes by a **2** arguments callback function:

```js
{
  // omit...
  headerAttrs: (column, colIndex) => ({
    // return customized HTML attribute here
  })
}
```

**Parameters**
* `column`: The value of current column. 
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

**Return value**

A new `Object` will be the result of element headerAttrs.

> Caution:   
> Same as [column.attrs](#columnattrs-object-function), it has lower priority and will be
> overwrited when other props related to HTML attributes were given.

## headerSortingClasses - [String | Function]

`headerSortingClasses` allows to customize `class` for header cell when this column is sorting.

```js
const headerSortingClasses = 'demo-sorting';
```

Furthermore, it also accepts a callback which takes **4** arguments and `String` is expected to return:

```js
const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => { ... }
```

* `column`: The value of current column.
* `sortOrder`: The order of current sorting
* `isLastSorting`: Is the last one of sorted columns.
* `colIndex`: The index of the current column being processed in BootstrapTable.

## headerSortingStyle - [Object | Function]

It's similiar to [headerSortingClasses](#headersortingclasses-string-function). It allows to customize the style of header cell when this column is sorting. A style `Object` and `callback` are acceptable. `callback` takes **4** arguments and an `Object` is expected to return:

```js
const sortingHeaderStyle = {
  backgroundColor: 'red'
};
```

## column.editable - [Bool | Function]
`column.editable` default is true, means every column is editable if you configure [`cellEdit`](./cell-edit-props.html). But you can disable some columns editable via setting `false`.

If a callback function given, you can control the editable level as cell level:

```js
{
  // omit...
  editable: (cell, row, rowIndex, colIndex) => {
    // return true or false;
  }
}
```

## column.validator - [Function]
`column.validator` used for validate the data when cell on updating. it's should accept a callback function with following argument:
`newValue`, `row` and `column`:

```js
{
  // omit...
  validator: (newValue, row, column) => {
    return ...;
  }
}
```

The return value can be a bool or an object. If your validation is pass, return `true` explicitly. If your validation is invalid, return following object instead:
```js
{
  valid: false,
  message: 'SOME_REASON_HERE'
}
```

## column.editCellStyle - [Object | Function]
You can use `column.editCellStyle` to custom the style of `<td>` when cell editing. It like most of customizable functionality, it also accept a callback function with following params:

**Parameters**
* `cell`: The value of current cell. 
* `row`: The object of `row` being processed in the `BootstrapTable`.
* `rowIndex`: The index of the current `row` being processed in the `BootstrapTable`.
* `colIndex`: The index of the current `column` being processed in `BootstrapTable`.

```js
{
  editCellStyle: { ... }
}
```
Or take a callback function

```js
{
  editCellStyle: (cell, row, rowIndex, colIndex) => {
    // it is suppose to return an object
  }
}
```

## column.editCellClasses - [String | Function]
You can use `column.editCellClasses` to add custom class on `<td>` when cell editing. It's same as [`column.editCellStyle`](#columneditcellstyle-object-function) which also accept a callback function to able to custom your class more flexible. Following is the arguments of this callback function: `cell`, `row`, `rowIndex`, `colIndex`.

```js
{
  editCellClasses: 'custom-class'
}
```
Or take a callback function

```js
{
  editCellClasses: (cell, row, rowIndex, colIndex) => {
    // it is suppose to return a string
  }
}
```

## column.editorStyle - [Object | Function]
This is almost same as [`column.editCellStyle`](#columneditcellstyle-object-function), but `column.editorStyle` is for custom the style on editor instead of cell(`td`).

## column.editorClasses - [String | Function]
This is almost same as [`column.editCellClasses`](#columneditcellclasses-string-function), but `column.editorClasses` is for custom the class on editor instead of cell(`td`).

## column.editor - [Object]
`column.editor` allow you to custom the type of cell editor by following predefined type:

* Text(Default)
* Dropdown
* Date
* Textarea
* Checkbox

Following is a quite example: 

```js
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const columns = [
  //...
  , {
    dataField: 'done',
    text: 'Done',
    editor: {
      type: Type.CHECKBOX,
      value: 'Y:N'
    }
  }
];
```

Please check [here](./basic-celledit.html#rich-editors) for more detail about rich editors.

## column.editorRenderer - [Function]
If you feel above predefined editors are not satisfied to your requirement, you can totally custom the editor via `column.editorRenderer`:

```js
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

// Custom Editor
class QualityRanger extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired
  }
  static defaultProps = {
    value: 0
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return [
      <input
        { ...rest }
        key="range"
        ref={ node => this.range = node }
        type="range"
        min="0"
        max="100"
      />,
      <button
        key="submit"
        className="btn btn-default"
        onClick={ () => onUpdate(this.getValue()) }
      >
        done
      </button>
    ];
  }
}


const columns = [
  //...
  , {
    dataField: 'done',
    text: 'Done',
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) =>
      <QualityRanger { ...editorProps } value={ value } />;
  }
];
```
Please check [here](./basic-celledit.html#customize-editor) for more detail.

## column.filter - [Object]
Configure `column.filter` will able to setup a column level filter on the header column. Currently, `react-bootstrap-table2` support following filters:

* Text Filter
* Select Filter
* Number Filter
* Date Filter

We have a quick example to show you how to use `column.filter`:

```js
import { textFilter } from 'react-bootstrap-table2-filter';

// omit...
{
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}
```

For some reason of simple customization, `react-bootstrap-table2` allow you to pass some props to filter factory function. Please check [here](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/master/packages/react-bootstrap-table2-filter/README.md) for more detail tutorial.

## column.filterValue - [Function]
Sometimes, if the cell/column value that you don't want to filter on them, you can define `filterValue` to return a actual value you wanna be filtered:

**Parameters**
* `cell`: The value of current cell. 
* `row`: The value of current row.

**Return value**

A final `String` value you want to be filtered.

```js
// omit...
{
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter(),
  filterValue: (cell, row) => owners[cell]
}
```


## column.csvType - [Object]
Default is `String`. Currently, the available value is `String` and `Number`. If `Number` assigned, the cell value will not wrapped with double quote.

## column.csvFormatter - [Function]

This is same as [`column.formatter`](#columnformatter-function). But `csvFormatter` only for CSV export and called when export CSV.

## column.csvText - [String]
Custom the CSV header cell, Default is [`column.text`](#columntext-required-string).

## column.csvExport - [Bool]
Default is `true`, `false` will hide this column when export CSV.

