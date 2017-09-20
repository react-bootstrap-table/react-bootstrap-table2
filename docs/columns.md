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
* [editable](#editable)

Following is a most simplest and basic usage:

```js
const rows = [ { id: 1, name: '...', price: '102' } ];
const columns = [ {
    dataField: id, 
    text: Production ID
  }, {
    dataField: name,
    text: Production Name
  }, {
    dataField: price,
    text: Production Price
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
`text` will be apply as the column text in header column, if your header is not only text and you want to customize your header column, please check [`column.headerFormatter`](#headerFormatter)

## <a name='hidden'>column.hidden - [Bool]</a>
`hidden` allow you to hide column when `true` given.

## <a name='formatter'>column.formatter - [Function]</a>
`formatter` allow you to customize the table column and only accept a callback function which take four arguments and a JSX/String are expected for return.

* `cell`
* `row`
* `rowIndex`
* [`formatExtraData`](#formatExtraData)

## <a name='headerFormatter'>column.headerFormatter - [Function]</a>
`headerFormatter` allow you to customize the header column and only accept a callback function which take two arguments and a JSX/String are expected for return.

* `column`: column object itself
* `colIndex`

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

## <a name='classes'>column.classes - [String | Function]</a>
It's availabe to have custom class on table column:

```js
{
  // omit...
  classes: 'id-custom-cell'
}
```
In addition, `classes` also accept a callback function which have more power to custom the css class on each columns. This callback function take `4` arguments and a `string` is expect to return: 


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

A new `String` will be the result of element class.

## <a name='headerClasses'>column.headerClasses - [String | Function]</a>
It's similar to [`column.classes`](#classes), `headerClasses` is availabe to have customized class on table header column:

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
It's availabe to have custom style on table column:

```js
{
  // omit...
  style: { backgroundColor: 'green' }
}
```

In addition, similar to [`column.classes`](#classes), `style` also accept a callback function which have more power to customize the `inline style` on each columns. This callback function takes `4` arguments and an `Object` is expect to return: 


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
It's availabe to have customized inline-style on table header column:

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


## <a name='title'>column.title - [Bool | Function]</a>
`react-bootstrap-table2` is disable [`HTML title`](https://www.w3schools.com/tags/tag_title.asp) as default. You can assign `title` as `true` to enable the HTML title on table column and take `cell content` as default value. Additionally, you could customize title via a callback. It takes `4` arguments and a `String` is expect to return: 


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

It's also availabe to custom via a callback function:
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

Besides, `align` also accept a callback function for dynamically setting text align. It takes `4` arguments and a `String` is expect to return: 

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

#### * Caution

If `column.classes`, `column.style`, `column.title`, `column.hidden` or `column.align` was given at the same time, property `attrs` has lower priorty and it will be overwrited.

```js
{
  // omit...
  title: true, // it will be chosen.
  attrs: { title: 'test' }
}
```

## <a name='headerAttrs'>column.headerAttrs - [Object | Function]</a>
`headerAttrs` is similiar to [`column.attrs`](#attrs) but it works for header column. 
```js
{
  // omit...
  headerAttrs: {
    title: 'bar',
    'data-test': 'foo'
  }
}
```

Additionally, customize the header attributes by a `2-arguments` callback function:

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
> overwrited when other props related to HTML attributes were given.

## <a name='editable'>column.editable - [Bool]</a>
`column.editable` default is true, means every column is editable if you configure [`cellEdit`](./README.md#cellEdit). But you can disable some columns editable via setting `false`.