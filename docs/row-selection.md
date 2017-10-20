
# Row selection
`react-bootstrap-table2` supports the row selection feature. By passing prop `selectRow` to enable row selection. When you enable this feature, `react-bootstrap-table2` will append a new selection column at first. 


## Available properties

The following are available properties in `selectRow`:

#### Required
* [mode (**required**)](#mode)
* [style](#style)
* [classes)](#classes)
* [nonSelectable)](#nonSelectable)

#### Optional

## <a name="mode">selectRow.mode - [String]</a>

Specifying the selection way for `single(radio)` or `multiple(checkbox)`. If `radio` was assigned, there will be a radio button in the selection column; otherwise, the `checkbox` instead.

#### values
* `radio`
* `checkbox`

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

## <a name='style'>selectRow.style - [Object | Function]</a>
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

## <a name='classes'>selectRow.classes - [String | Function]</a>
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

## <a name='nonSelectable'>selectRow.nonSelectable - [Array]</a>
This prop allow you to restrict some rows which can not be selected by user. `selectRow.nonSelectable` accept an rowkeys array.

```js
const selectRow = {
  mode: 'checkbox',
  nonSelectable: [1, 3 ,5]
};
```