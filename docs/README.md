# Documents

## Props on BootstrapTable

#### Required
* [keyField (**required**)](#keyField)
* [data (**required**)](#data)
* [columns (**required**)](#columns)

#### Optional
* [caption](#caption)
* [striped](#striped)
* [bordered](#bordered)
* [hover](#hover)
* [condensed](#condensed)
* [cellEdit](#cellEdit)
* [selectRow](#selectRow)

### <a name='keyField'>keyField(**required**) - [String]</a>
`keyField` is a prop to tell `react-bootstrap-table2` which column is unigue key.

### <a name='data'>data(**required**) - [Array]</a>
Assign your table data via `data` prop. It only accept an Array object.

### <a name='columns'>columns(**required**) - [Object]</a>
`columns` props accept an Array object, please see [columns definition](./columns.md) for more detail.

### <a name='caption'>caption - [String | Node]</a>
Same as [caption tag](https://www.w3schools.com/TAgs/tag_caption.asp) in HTML. You can give a String or a React JSX.

### <a name='striped'>striped - [Bool]</a>
Same as `.table-striped` class for adding zebra-stripes to a table
### <a name='bordered'>bordered - [Bool]</a>
Same as `.table-bordered` class for adding borders on all sides of the table and cells
### <a name='hover'>hover - [Bool]</a>
Same as `.table-hover` class for adding a hover effect (grey background color) on table rows
### <a name='condensed'>condensed - [Bool]</a>
Same as `.table-condensed` class for makeing a table more compact by cutting cell padding in half

### <a name='cellEdit'>cellEdit - [Object]</a>
Assign a valid `cellEdit` object can enable the cell editing on the cell. The default usage is click/dbclick to trigger cell editing and press `ENTER` to save cell or press `ESC` to cancel editing.

> Note: The `keyField` column can't be edited

Following is a `cellEdit` object:
```js
{
  mode: 'click',
  blurToSave: true,
  timeToCloseMessage: 2500,
  onEditing: (rowId, dataField, newValue) => { ... },
  beforeSaveCell: (oldValue, newValue, row, column) => { ... },
  afterSaveCell: (oldValue, newValue, row, column) => { ... },
  nonEditableRows: () => { ... }
}
```
#### <a name='cellEdit.mode'>cellEdit.mode - [String]</a>
`cellEdit.mode` possible value is `click` and `dbclick`. **It's required value** that tell `react-bootstrap-table2` how to trigger the cell editing.

#### <a name='cellEdit.blurToSave'>cellEdit.blurToSave - [Bool]</a>
Default is `false`, enable it will be able to save the cell automatically when blur from the cell editor.

#### <a name='cellEdit.nonEditableRows'>cellEdit.nonEditableRows - [Function]</a>
`cellEdit.nonEditableRows` accept a callback function and expect return an array which used to restrict all the columns of some rows as non-editable. So the each item in return array should be rowkey(`keyField`)

#### <a name='cellEdit.timeToCloseMessage'>cellEdit.timeToCloseMessage - [Function]</a>
If a [`column.validator`](./columns.md#validator) defined and the new value is invalid, `react-bootstrap-table2` will popup a alert at the bottom of editor. `cellEdit.timeToCloseMessage` is a chance to let you decide how long the alert should be stay. Default is 3000 millisecond.

### <a name='selectRow'>selectRow - [Object]</a>
Pass prop `selectRow` to enable row selection. For more detail, please navigate to [row selection document](./row-selection.md).
