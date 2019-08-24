
# Row expand
`react-bootstrap-table2` supports the row expand feature. By passing prop `expandRow` to enable this functionality. 

> Default is click to expand/collapse a row. In addition, we don't support any way to change this mechanism!

## Required
* [renderer (**required**)](#renderer)

## Optional
* [expanded](#expanded)
* [nonExpandable](#nonExpandable)
* [onExpand](#onExpand)
* [onExpandAll](#onExpandAll)
* [showExpandColumn](#showExpandColumn)
* [onlyOneExpanding](#onlyOneExpanding)
* [expandByColumnOnly](#expandByColumnOnly)
* [expandColumnPosition](#expandColumnPosition)
* [expandColumnRenderer](#expandColumnRenderer)
* [expandHeaderColumnRenderer](#expandHeaderColumnRenderer)
* [className](#className)
* [parentClassName](#parentClassName)

### <a name="renderer">expandRow.renderer - [Function]</a>

Specify the content of expand row, `react-bootstrap-table2` will pass a row object as argument and expect return a react element.

#### values
* **row**
* **rowIndex**

#### examples

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

### <a name='expanded'>expandRow.expanded - [Array]</a>
`expandRow.expanded` allow you have default row expandations on table.

```js
const expandRow = {
  renderer: (row) => ...
  expanded: [1, 3] // should be a row keys array
};
```

### <a name='nonExpandable'>expandRow.nonExpandable - [Array]</a>
This prop allow you to restrict some rows which can not be expanded by user. `expandRow.nonExpandable` accept an rowkeys array.

```js
const expandRow = {
  renderer: (row) => ...
  nonExpandable: [1, 3 ,5]
};
```

### <a name='onExpand'>expandRow.onExpand - [Function]</a>
This callback function will be called when a row is expand/collapse and pass following four arguments:
`row`, `isExpand`, `rowIndex` and `e`.

```js
const expandRow = {
  renderer: (row) => ...
  onExpand: (row, isExpand, rowIndex, e) => {
    // ...
  }
};
```

### <a name='onExpandAll'>expandRow.onExpandAll - [Function]</a>
This callback function will be called when expand/collapse all. It only work when you configure [`expandRow.showExpandColumn`](#showExpandColumn) as `true`.

```js
const expandRow = {
  renderer: (row) => ...
  onExpandAll: (isExpandAll, results, e) => {
    // ...
  }
};
```

### <a name='expandColumnRenderer'>expandRow.expandColumnRenderer - [Function]</a>
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

> By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.

### <a name='expandHeaderColumnRenderer'>expandRow.expandHeaderColumnRenderer - [Function]</a>
Provide a callback function which allow you to custom the expand indicator in the expand header column. This callback only have one argument which is an object and contain one property `isAnyExpands` which indicate if there's any rows are expanded:

```js
const expandRow = {
  renderer: (row) => ...
  expandHeaderColumnRenderer: ({ isAnyExpands }) => (
    // ....
  )
};
```

> By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.

### <a name='showExpandColumn'>expandRow.showExpandColumn - [Bool]</a>
Default is `false`, if you want to have a expand indicator, give this prop as `true`

```js
const expandRow = {
  renderer: (row) => ...
  showExpandColumn: true
};
```

### <a name='onlyOneExpanding'>expandRow.onlyOneExpanding - [Bool]</a>
Default is `false`. Enable this will only allow one row get expand at the same time.

```js
const expandRow = {
  renderer: (row) => ...
  onlyOneExpanding: true
};
```

### <a name='expandByColumnOnly'>expandRow.expandByColumnOnly - [Bool]</a>
Default is `false`. If you want to restrict user to expand/collapse row via clicking the expand column only, you can enable it. 

```js
const expandRow = {
  renderer: (row) => ...,
  showExpandColumn: true,
  expandByColumnOnly: true
};
```

### <a name='expandColumnPosition'>expandRow.expandColumnPosition - [String]</a>
Default is `left`. You can give this as `right` for rendering expand column in the right side.

```js
const expandRow = {
  renderer: (row) => ...,
  showExpandColumn: true,
  expandColumnPosition: 'right'
};
```

### <a name='className'>expandRow.className - [String | Function]</a>
Apply the custom class name on the expanding row. For example: 

```js
const expandRow = {
  renderer: (row) => ...,
  className: 'foo'
};
```
following usage is more flexible way for customing the class name: 

```js
const expandRow = {
  renderer: (row) => ...,
  className: (isExpanded, row, rowIndex) => {
    if (rowIndex > 2) return 'foo';
    return 'bar';
  }
};
```

### <a name='parentClassName'>expandRow.parentClassName - [String | Function]</a>
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