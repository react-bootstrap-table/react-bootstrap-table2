# Cell Editing
Before start to use cell edit, please remember to install `react-bootstrap-table2-editor`

```sh
$ npm install react-bootstrap-table2-editor --save
```

# Properties on cellEdit prop
* [mode (**required**)](#mode)
* [blurToSave](#blurToSave)
* [nonEditableRows](#nonEditableRows)
* [timeToCloseMessage](#timeToCloseMessage)
* [beforeSaveCell](#beforeSaveCell)
* [afterSaveCell](#afterSaveCell)
* [errorMessage](#errorMessage)
* [onErrorMessageDisappear](#onErrorMessageDisappear)

## <a name='cellEdit'>cellEdit - [Object]</a>
Assign a valid `cellEdit` object can enable the cell editing on the cell. The default usage is click/dbclick to trigger cell editing and press `ENTER` to save cell or press `ESC` to cancel editing.

> Note: The `keyField` column can't be edited

Following is the shape of `cellEdit` object:
```js
{
  mode: 'click',
  blurToSave: true,
  timeToCloseMessage: 2500,
  errorMessage: '',
  beforeSaveCell: (oldValue, newValue, row, column) => { ... },
  afterSaveCell: (oldValue, newValue, row, column) => { ... },
  onErrorMessageDisappear: () => { ... },
  nonEditableRows: () => { ... }
}
```

### <a name='mode'>cellEdit.mode - [String]</a>
`cellEdit.mode` possible value is `click` and `dbclick`. **It's required value** that tell `react-bootstrap-table2` how to trigger the cell editing.

### <a name='blurToSave'>cellEdit.blurToSave - [Bool]</a>
Default is `false`, enable it will be able to save the cell automatically when blur from the cell editor.

### <a name='nonEditableRows'>cellEdit.nonEditableRows - [Function]</a>
`cellEdit.nonEditableRows` accept a callback function and expect return an array which used to restrict all the columns of some rows as non-editable. So the each item in return array should be rowkey(`keyField`)

### <a name='timeToCloseMessage'>cellEdit.timeToCloseMessage - [Function]</a>
If a [`column.validator`](./columns.md#validator) defined and the new value is invalid, `react-bootstrap-table2` will popup a alert at the bottom of editor. `cellEdit.timeToCloseMessage` is a chance to let you decide how long the alert should be stay. Default is 3000 millisecond.

### <a name='beforeSaveCell'>cellEdit.beforeSaveCell - [Function]</a>
This callback function will be called before triggering cell update.

```js
const cellEdit = {
  // omit...
  beforeSaveCell: (oldValue, newValue, row, column) => { ... }
}
```

### <a name='afterSaveCell'>cellEdit.afterSaveCell - [Function]</a>
This callback function will be called after updating cell.

```js
const cellEdit = {
  // omit...
  afterSaveCell: (oldValue, newValue, row, column) => { ... }
};
```

### <a name='errorMessage'>cellEdit.errorMessage - [String]</a>
This prop is not often used. Only used when you keep the error message in your application state and also handle the cell editing on remote mode.

### <a name='onErrorMessageDisappear'>cellEdit.onErrorMessageDisappear - [Function]</a>
This callback function will be called when error message discard.

