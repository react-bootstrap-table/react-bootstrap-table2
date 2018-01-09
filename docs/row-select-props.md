---
id: row-select-props
title: Row Selection Props
---

## Required
* [mode (**required**)](#selectrowmode-string)

## Optional
* [style](#selectrowstyle-object-function)
* [classes](#selectrowclasses-string-function)
* [bgColor](#selectrowbgcolor-string-function)
* [nonSelectable)](#selectrownonselectable-array)
* [clickToSelect)](#selectrowclicktoselect-bool)
* [clickToEdit](#selectrowclicktoedit-bool)
* [onSelect](#selectrowonselect-function)
* [onSelectAll](#selectrowonselectall-function)
* [hideSelectColumn](#selectrowhideselectcolumn-bool)

-----

## selectRow.mode - [String]

Specifying the selection way for `single(radio)` or `multiple(checkbox)`. If `radio` was assigned, there will be a radio button in the selection column; otherwise, the `checkbox` instead.

### Available values
* **radio**
* **checkbox**

Following is a quick example for single selection: 

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

## selectRow.style - [Object | Function]
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

## selectRow.classes - [String | Function]
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

## selectRow.bgColor - [String | Function]
A quick way to specify the backgroud color when row is selected

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

## selectRow.nonSelectable - [Array]
This prop allow you to restrict some rows which can not be selected by user. `selectRow.nonSelectable` accept an rowkeys array.

```js
const selectRow = {
  mode: 'checkbox',
  nonSelectable: [1, 3 ,5]
};
```

## selectRow.clickToSelect - [Bool]
Allow user to select row by clicking on the row.

```js
const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};
```

> Note: When you also enable [cellEdit](./cell-edit-props.html), the `selectRow.clickToSelect` will deactivate the functionality of cell editing. If you want to click on row to select row and edit cell simultaneously, you are suppose to enable [`selectRow.clickToEdit`](#selectrowclicktoedit-bool)

## selectRow.clickToEdit - [Bool]
Able to click to edit cell and select row at the same time.

```js
const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
  clickToEdit: true
};
```

## selectRow.onSelect - [Function]
This callback function will be called when a row is select/unselect and pass following three arguments:
`row`, `isSelect` and `rowIndex`.

```js
const selectRow = {
  mode: 'checkbox',
  onSelect: (row, isSelect, rowIndex) => {
    // ...
  }
};
```

## selectRow.onSelectAll - [Function]
This callback function will be called when select/unselect all and it only work when you configure [`selectRow.mode`](#selectrowmode-string) as `checkbox`.

```js
const selectRow = {
  mode: 'checkbox',
  onSelectAll: (isSelect, results) => {
    // ...
  }
};
```

## selectRow.hideSelectColumn - [Bool]
Default is `false`, if you don't want to have a selection column, give this prop as `true`

```js
const selectRow = {
  mode: 'radio',
  hideSelectColumn: true,
  clickToSelect: true,
  bgColor: 'red'
};
```