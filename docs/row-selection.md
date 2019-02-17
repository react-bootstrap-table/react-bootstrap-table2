
# Row selection
`react-bootstrap-table2` supports the row selection feature. By passing prop `selectRow` to enable row selection. When you enable this feature, `react-bootstrap-table2` will append a new selection column at first. 

## Required
* [mode (**required**)](#mode)

## Optional
* [selected](#selected)
* [style](#style)
* [classes)](#classes)
* [bgColor](#bgColor)
* [nonSelectable)](#nonSelectable)
* [clickToSelect)](#clickToSelect)
* [clickToExpand)](#clickToExpand)
* [clickToEdit](#clickToEdit)
* [onSelect](#onSelect)
* [onSelectAll](#onSelectAll)
* [hideSelectColumn](#hideSelectColumn)
* [hideSelectAll](#hideSelectAll)
* [selectionRenderer](#selectionRenderer)
* [selectionHeaderRenderer](#selectionHeaderRenderer)

### <a name="mode">selectRow.mode - [String]</a>

Specifying the selection way for `single(radio)` or `multiple(checkbox)`. If `radio` was assigned, there will be a radio button in the selection column; otherwise, the `checkbox` instead.

#### values
* **radio**
* **checkbox**

#### examples

```js
const selectRow = {
  mode: 'radio' // single row selection
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRowProp }
/>
```

```js
const selectRow = {
  mode: 'checkbox' // multiple row selection
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRowProp }
/>
```

### <a name='selected'>selectRow.selected - [Array]</a>
`selectRow.selected` allow you have default selections on table.

```js
const selectRow = {
  mode: 'checkbox',
  selected: [1, 3] // should be a row keys array
};
```

### <a name='style'>selectRow.style - [Object | Function]</a>
`selectRow.style` allow you to have custom style on selected rows:

```js
const selectRow = {
  mode: 'checkbox',
  style: { background: 'red' }
};
```

If you wanna more flexible customization, `selectRow.style` also accept a function:

```js
const selectRow = {
  mode: 'checkbox',
  style: (row, rowIndex) => { return ...; }
};
```

### <a name='classes'>selectRow.classes - [String | Function]</a>
`selectRow.classes` allow you to add css class on selected rows:

```js
const selectRow = {
  mode: 'checkbox',
  classes: 'custom-class'
};
```

If you wanna more flexible customization, `selectRow.classes` also accept a function:

```js
const selectRow = {
  mode: 'checkbox',
  classes: (row, rowIndex) => { return ...; }
};
```

### <a name='bgColor'>selectRow.bgColor - [String | Function]</a>
The background color when row is selected

```js
const selectRow = {
  mode: 'checkbox',
  bgColor: 'red'
};
```

There's also a more good way to custom it:

```js
const selectRow = {
  mode: 'checkbox',
  bgColor: (row, rowIndex) => {
    return ....;  // return a color code
  }
};
```

### <a name='nonSelectable'>selectRow.nonSelectable - [Array]</a>
This prop allow you to restrict some rows which can not be selected by user. `selectRow.nonSelectable` accept an rowkeys array.

```js
const selectRow = {
  mode: 'checkbox',
  nonSelectable: [1, 3 ,5]
};
```

### <a name='clickToSelect'>selectRow.clickToSelect - [Bool]</a>
Allow user to select row by clicking on the row.

```js
const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};
```

> Note: When you also enable [cellEdit](./cell-edit.md), the `selectRow.clickToSelect` will deactivate the functionality of cell editing   
> If you want to click on row to select row and edit cell simultaneously, you are suppose to enable [`selectRow.clickToEdit`](#clickToEdit)

### <a name='clickToExpand'>selectRow.clickToExpand - [Bool]</a>
Default is false, enable it will let user able to expand and select row when user clicking on the row.

```js
const selectRow = {
  mode: 'checkbox',
  clickToExpand: true
};
```

### <a name='clickToEdit'>selectRow.clickToEdit - [Bool]</a>
Able to click to edit cell and select row

```js
const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
  clickToEdit: true
};
```

### <a name='selectionRenderer'>selectRow.selectionRenderer - [Function]</a>
Provide a callback function which allow you to custom the checkbox/radio box. This callback only have one argument which is an object and contain following properties:

```js
const selectRow = {
  mode: 'checkbox',
  selectionRenderer: ({ mode, checked, disabled, rowIndex }) => (
    // ....
  )
};
```

> By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.

### <a name='selectionHeaderRenderer'>selectRow.selectionHeaderRenderer - [Function]</a>
Provide a callback function which allow you to custom the checkbox/radio box in the selection header column. This callback only have one argument which is an object and contain following properties:

```js
const selectRow = {
  mode: 'checkbox',
  selectionHeaderRenderer: ({ mode, checked, indeterminate }) => (
    // ....
  )
};
```

> By default, `react-bootstrap-table2` will help you to handle the click event, it's not necessary to handle again by developer.

### <a name='onSelect'>selectRow.onSelect - [Function]</a>
This callback function will be called when a row is select/unselect and pass following three arguments:
`row`, `isSelect`, `rowIndex` and `e`.

```js
const selectRow = {
  mode: 'checkbox',
  onSelect: (row, isSelect, rowIndex, e) => {
    // ...
  }
};
```

> If you want to reject current select action, just return `false`:

```js
const selectRow = {
  mode: 'checkbox',
  onSelect: (row, isSelect, rowIndex, e) => {
    if (SOME_CONDITION) {
      return false;
    }
  }
};
```

### <a name='onSelectAll'>selectRow.onSelectAll - [Function]</a>
This callback function will be called when select/unselect all and it only work when you configure [`selectRow.mode`](#mode) as `checkbox`.

```js
const selectRow = {
  mode: 'checkbox',
  onSelectAll: (isSelect, rows, e) => {
    // ...
  }
};
```

> If you want to control the final selection result, just return a row key array:

```js
const selectRow = {
  mode: 'checkbox',
  onSelectAll: (isSelect, rows, e) => {
    if (isSelect && SOME_CONDITION) {
      return [1, 3, 4];  // finally, key 1, 3, 4 will being selected 
    }
  }
};
```

### <a name='hideSelectColumn'>selectRow.hideSelectColumn - [Bool]</a>
Default is `false`, if you don't want to have a selection column, give this prop as `true`

```js
const selectRow = {
  mode: 'radio',
  hideSelectColumn: true,
  clickToSelect: true,
  bgColor: 'red'
};
```

### <a name='hideSelectAll'>selectRow.hideSelectAll - [Bool]</a>
Default is `false`, if you don't want to render the select all checkbox on the header of selection column, give this prop as `true`!

```js
const selectRow = {
  mode: 'checkbox',
  hideSelectAll: true
};
```
