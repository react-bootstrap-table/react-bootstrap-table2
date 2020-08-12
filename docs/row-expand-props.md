---
id: row-expand-props
title: Row Expand Props
---
`react-bootstrap-table2` supports the row expand feature. By passing prop `expandRow` to enable this functionality. 

> Default is click to expand/collapse a row. In addition, we don't support any way to change this mechanism!

## Required
* [renderer (**required**)](#expandrowrenderer-function)

## Optional
* [expanded](#expandrowexpanded-array)
* [nonExpandable](#expandrownonexpandable-array)
* [onExpand](#expandrowonexpand-function)
* [onExpandAll](#expandrowonexpandall-function)
* [showExpandColumn](#expandrowshowexpandcolumn-bool)
* [onlyOneExpanding](#expandrowonlyoneexpanding-bool)
* [expandByColumnOnly](#expandrowexpandbycolumnonly-bool)
* [expandColumnPosition](#expandrowexpandcolumnposition-string)
* [expandColumnRenderer](#expandrowexpandcolumnrenderer-function)
* [expandHeaderColumnRenderer](#expandrowexpandheadercolumnrenderer-function)
* [className](#expandrowclassname-string-function)
* [parentClassName](#expandrowparentclassname-string-function)

-----

## expandRow.renderer - [Function]

Specify the content of expand row, `react-bootstrap-table2` will pass the two arguments and expect to return a react element:

* `row`: Currnet row data.
* `rowIndex`: Currnet row index.


```js
const expandRow = {
  renderer: (row, rowIndex) => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  expandRow={ expandRow }
/>
```


## expandRow.expanded - [Array]
`expandRow.expanded` is useful to manage the row expand on table, for example: you can use it to perform the default expands.

```js
const expandRow = {
  renderer: (row) => ...
  expanded: [1, 3] // should be a row keys array
};
```

## expandRow.nonExpandable - [Array]
This prop allow you to restrict some rows which can not be expanded by user. `expandRow.nonExpandable` accept an rowkeys array.

```js
const expandRow = {
  renderer: (row) => ...
  nonExpandable: [1, 3 ,5]
};
```

## expandRow.onExpand - [Function]
This prop accept a callback function which will be called when a row is expand/collapse and pass following four arguments:
`row`, `isExpand`, `rowIndex` and `e`.

```js
const expandRow = {
  renderer: (row) => ...
  onExpand: (row, isExpand, rowIndex, e) => {
    // ...
  }
};
```


## expandRow.onExpandAll - [Function]
This prop accept a callback function which will be called when expand/collapse all. It only work when you configure [`expandRow.showExpandColumn`](#expandrowshowexpandcolumn-bool) as `true`.

```js
const expandRow = {
  renderer: (row) => ...,
  showExpandColumn: true,
  onExpandAll: (isExpandAll, results, e) => {
    // ...
  }
};
```

## expandRow.showExpandColumn - [Bool]
Default is `false`, if you want to have a expand indicator, give this prop as `true`.

```js
const expandRow = {
  renderer: (row) => ...
  showExpandColumn: true
};
```

## expandRow.onlyOneExpanding - [Bool]
Default is `false`. Enable this will only allow one row get expand at the same time.

```js
const expandRow = {
  renderer: (row) => ...
  onlyOneExpanding: true
};
```

## expandRow.expandByColumnOnly - [Bool]
Default is `false`. If you want to restrict user to expand/collapse row via clicking the expand column only, you can enable it. 

```js
const expandRow = {
  renderer: (row) => ...,
  showExpandColumn: true,
  expandByColumnOnly: true
};
```

## expandRow.expandColumnPosition - [String]
Default is `left`. You can give this as `right` for rendering expand column in the right side.

 ```js
const expandRow = {
  renderer: (row) => ...,
  showExpandColumn: true,
  expandColumnPosition: 'right'
};

## expandRow.expandByColumnOnly - [Bool]
Default is `false`. If you want to restrict user to expand/collapse row via clicking the expand column only, you can enable it. 

```js
const expandRow = {
  renderer: (row) => ...,
  showExpandColumn: true,
  expandByColumnOnly: true
};
```

## expandRow.expandColumnRenderer - [Function]

Provide a callback function which allow you to custom the expand indicator. This callback only have one argument which is an object and contain these properties:
* `expanded`: If current row is expanded or not
* `rowKey`: Current row key
* `expandable`: If currnet row is expandable or not 


```js
const expandRow = {
  renderer: (row) => ...
  expandColumnRenderer: ({ expanded, rowKey, expandable }) => (
    // ....
  )
};
```


## expandRow.expandHeaderColumnRenderer - [Function]
Provide a callback function which allow you to custom the expand indicator in the expand header column. This callback only have one argument which is an object and contain one property `isAnyExpands` to indicate if there are any expanded rows:

```js
const expandRow = {
  renderer: (row) => ...,
  showExpandColumn: true,
  expandHeaderColumnRenderer: ({ isAnyExpands }) => (
    // ....
  )
};
```

## expandRow.className - [String | Function]
Apply the custom class name on the expanding row. For example: 

```js
const expandRow = {
  renderer: (row) => ...,
  className: 'foo'
};
```

Following case is more flexible way to custom the class name: 

```js
const expandRow = {
  renderer: (row) => ...,
  className: (isExpanded, row, rowIndex) => {
    if (rowIndex > 2) return 'foo';
    return 'bar';
  }
};
```

## expandRow.parentClassName - [String | Function]
Apply the custom class name on parent row of expanded row. For example: 

```js
const expandRow = {
  renderer: (row) => ...,
  parentClassName: 'foo'
};
```
Below case is more flexible way to custom the class name: 

```js
const expandRow = {
  renderer: (row) => ...,
  parentClassName: (isExpanded, row, rowIndex) => {
    if (rowIndex > 2) return 'foo';
    return 'bar';
  }
};
```
