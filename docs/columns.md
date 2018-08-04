# Definition of columns props on BootstrapTable

Available properties in a column object:

#### Required
* [dataField (**required**)](#dataField)
* [text (**required**)](#text)

#### Optional
* [hidden](#hidden)
* [formatter](#formatter)
* [formatExtraData](#formatExtraData)
* [sort](#sort)
* [sortFunc](#sortFunc)
* [onSort](#onSort)
* [classes](#classes)
* [style](#style)
* [title](#title)
* [events](#events)
* [align](#align)
* [attrs](#attrs)
* [headerFormatter](#headerFormatter)
* [headerClasses](#headerClasses)
* [headerStyle](#headerStyle)
* [headerTitle](#headerTitle)
* [headerEvents](#headerEvents)
* [headerAlign](#headerAlign)
* [headerAttrs](#headerAttrs)
* [headerSortingClasses](#headerSortingClasses)
* [headerSortingStyle](#headerSortingStyle)
* [editable](#editable)
* [validator](#validator)
* [editCellStyle](#editCellStyle)
* [editCellClasses](#editCellClasses)
* [editorStyle](#editorStyle)
* [editorClasses](#editorClasses)
* [editor](#editor)
* [editorRenderer](#editorRenderer)
* [filter](#filter)
* [filterValue](#filterValue)
* [csvType](#csvType)
* [csvFormatter](#csvFormatter)
* [csvText](#csvText)
* [csvExport](#csvExport)

Following is a most simplest and basic usage:

```js
const rows = [ { id: 1, name: '...', price: '102' } ];
const columns = [ {
    dataField: 'id', 
    text: 'Production ID'
  }, {
    dataField: 'name',
    text: 'Production Name'
  }, {
    dataField: 'price',
    text: 'Production Price'
  }
];
```

Let's introduce the definition of column object

## <a name='dataField'>column.dataField (**required**) - [String]</a>
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

## <a name='text'>column.text (**required**) - [String]</a>
`text` will be the column text in header column by default, if your header is not only text or you want to customize the header column, please check [`column.headerFormatter`](#headerFormatter)

## <a name='hidden'>column.hidden - [Bool]</a>
`hidden` allow you to hide column when `true` given.

## <a name='formatter'>column.formatter - [Function]</a>
`formatter` allow you to customize the table column and only accept a callback function which take four arguments and a JSX/String are expected for return.

* `cell`
* `row`
* `rowIndex`
* [`formatExtraData`](#formatExtraData)

## <a name='headerFormatter'>column.headerFormatter - [Function]</a>
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

## <a name='formatExtraData'>column.formatExtraData - [Any]</a>
It's only used for [`column.formatter`](#formatter), you can define any value for it and will be passed as fourth argument for [`column.formatter`](#formatter) callback function.

## <a name='sort'>column.sort - [Bool]</a>
Enable the column sort via a `true` value given.

## <a name='sortFunc'>column.sortFunc - [Function]</a>
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

## <a name='sortFunc'>column.onSort - [Function]</a>
`column.onSort` is an event listener for sort change event:

```js
{
  // omit...
  sort: true,
  onSort: (field, order) => {
    // ....
  }
}
```

## <a name='classes'>column.classes - [String | Function]</a>
It's available to have custom class on table column:

```js
{
  // omit...
  classes: 'id-custom-cell'
}
```
In addition, `classes` also accept a callback function which have more power to custom the css class on each columns. This callback function take **4** arguments and a `String` is expected to return:: 


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

## <a name='headerClasses'>column.headerClasses - [String | Function]</a>
It's similar to [`column.classes`](#classes), `headerClasses` is available to have customized class on table header column:

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

## <a name='style'>column.style - [Object | Function]</a>
It's available to have custom style on table column:

```js
{
  // omit...
  style: { backgroundColor: 'green' }
}
```

In addition, similar to [`column.classes`](#classes), `style` also accept a callback function which have more power to customize the `inline style` on each columns. This callback function takes **4** arguments and an `Object` is expect to return: 


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


## <a name='headerStyle'>column.headerStyle - [Object | Function]</a>
It's available to have customized inline-style on table header column:

```js
{
  // omit...
  headerStyle: { backgroundColor: 'green' }
}
```

Moreover, it also accept a callback function which takes **2** arguments and an `Object` is expect to return:

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


## <a name='title'>column.title - [Bool | Function]</a>
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

## <a name='headerTitle'>column.headerTitle - [Bool | Function]</a>
`headerTitle` is only for the title on header column, default is disable. The usage almost same as [`column.title`](#title), 

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

## <a name='align'>column.align - [String | Function]</a>
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

## <a name='headerAlign'>column.headerAlign - [String | Function]</a>
It's almost same as [`column.align`](#align), but it's for the [CSS text-align](https://www.w3schools.com/cssref/pr_text_text-align.asp) on header column. 

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


## <a name='events'>column.events - [Object]</a>
You can assign any [HTML Event](https://www.w3schools.com/tags/ref_eventattributes.asp) on table column via event property:

```js
{
  // omit...
  events: {
    onClick: e => { ... }
  }
}
```

## <a name='headerEvents'>column.headerEvents - [Object]</a>
`headerEvents` same as [`column.events`](#events) but this is for header column.

```js
{
  // omit...
  headerEvents: {
    onClick: e => { ... }
  }
}
```

## <a name='attrs'>column.attrs - [Object | Function]</a>
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
Not only `Object`, `callback function` is also acceptable. It takes `4` arguments and an `Object` is expect to return: 

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

> If `column.classes`, `column.style`, `column.title`, `column.hidden` or `column.align` was given at the same time, property `attrs` has lower priority and it will be overwritten.

```js
{
  // omit...
  title: true, // get higher priority
  attrs: { title: 'test' }
}
```

## <a name='headerAttrs'>column.headerAttrs - [Object | Function]</a>
`headerAttrs` is similar to [`column.attrs`](#attrs) but it works for header column. 
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
> Same as [column.attrs](#attrs), it has lower priority and will be
> overwritten when other props related to HTML attributes were given.

### <a name='headerSortingClasses'>headerSortingClasses - [String | Function]</a>

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

### <a name='headerSortingStyle'>headerSortingStyle - [Object | Function]</a>

It's similar to [headerSortingClasses](#headerSortingClasses). It allows to customize the style of header cell when this column is sorting. A style `Object` and `callback` are acceptable. `callback` takes **4** arguments and an `Object` is expected to return:

```js
const sortingHeaderStyle = {
  backgroundColor: 'red'
};
```

## <a name='editable'>column.editable - [Bool | Function]</a>
`column.editable` default is true, means every column is editable if you configure [`cellEdit`](./README.md#cellEdit). But you can disable some columns editable via setting `false`.

If a callback function given, you can control the editable level as cell level:

```js
{
  // omit...
  editable: (cell, row, rowIndex, colIndex) => {
    // return true or false;
  }
}
```

## <a name='validator'>column.validator - [Function]</a>
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

## <a name='editCellStyle'>column.editCellStyle - [Object | Function]</a>
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

## <a name='editCellClasses'>column.editCellClasses - [String | Function]</a>
You can use `column.editCellClasses` to add custom class on `<td>` when cell editing. It's same as [`column.editCellStyle`](#editCellStyle) which also accept a callback function to able to custom your class more flexible. Following is the arguments of this callback function: `cell`, `row`, `rowIndex`, `colIndex`.

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

## <a name='editorStyle'>column.editorStyle - [Object | Function]</a>
This is almost same as [`column.editCellStyle`](#editCellStyle), but `column.editorStyle` is custom the style on editor instead of cell(`td`).

## <a name='editorClasses'>column.editorClasses - [Object | Function]</a>
This is almost same as [`column.editCellClasses`](#editCellClasses), but `column.editorClasses` is custom the class on editor instead of cell(`td`).

## <a name='editor'>column.editor - [Object]</a>
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

If you want more information, please check [here](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/master/packages/react-bootstrap-table2-editor).

## <a name='editorRenderer'>column.editorRenderer - [Function]</a>
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

## <a name='filter'>column.filter - [Object]</a>
Configure `column.filter` will able to setup a column level filter on the header column. Currently, `react-bootstrap-table2` support following filters:

* Text(`textFilter`)
* Select(`selectFilter`)
* Number(`numberFilter`)
* Date(`dateFilter`)

We have a quick example to show you how to use `column.filter`:

```
import { textFilter } from 'react-bootstrap-table2-filter';

// omit...
{
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}
```

For some reason of simple customization, `react-bootstrap-table2` allow you to pass some props to filter factory function. Please check [here](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/master/packages/react-bootstrap-table2-filter/README.md) for more detail tutorial.

## <a name='filterValue'>column.filterValue - [Function]</a>
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

## <a name='csvType'>column.csvType - [Object]</a>
Default is `String`. Currently, the available value is `String` and `Number`. If `Number` assigned, the cell value will not wrapped with double quote.

## <a name='csvFormatter'>column.csvFormatter - [Function]</a>

This is same as [`column.formatter`](#formatter). But `csvFormatter` only for CSV export and called when export CSV.

## <a name='csvText'>column.csvText - [String]</a>
Custom the CSV header cell, Default is [`column.text`](#text).

## <a name='csvExport'>column.csvExport - [Bool]</a>
Default is `true`, `false` will hide this column when export CSV.
