# Properties on cellEdit prop
* [mode (**required**)](#mode)
* [blurToSave](#blurToSave)
* [nonEditableRows](#nonEditableRows)
* [timeToCloseMessage](#timeToCloseMessage)
* [beforeSaveCell](#beforeSaveCell)
* [afterSaveCell](#afterSaveCell)
* [onUpdate](#onUpdate)
* [editing](#editing)
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
  editing: false|true,
  errorMessage: '',
  onUpdate: (rowId, dataField, newValue) => { ... },
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

### <a name='onUpdate'>cellEdit.onUpdate - [Function]</a>
If you want to control the cell updating process by yourself, for example, connect with `Redux` or saving data to backend database, `cellEdit.onUpdate` is a great chance you can work on it.   

Firsylt, `react-bootstrap-table2` allow `cellEdit.onUpdate` to return a promise:

```js
const cellEdit = {
  // omit...
  onUpdate: (rowId, dataField, newValue) => {
    return apiCall().then(response => {
      console.log('update cell to backend successfully');
      // Actually, you dont do any thing here, we will update the new value when resolve your promise
    })
    .catch(err => throw new Error(err.message));
  }
};
```

If your promise is resolved successfully, `react-bootstrap-table2` will default help you to update the new cell value.   
If your promise is resolved failure, you can throw an `Error` instance, `react-bootstrap-table2` will show up the error message (Same behavior like [`column.validator`](./columns.md#validator)).   

In some case, backend will return a new value to client side and you want to apply this new value instead of the value that user input. In this situation, you can return an object which contain a `value` property:

```js
const cellEdit = {
  // omit...
  onUpdate: (rowId, dataField, newValue) => {
    return apiCall().then(response => {
      return { value: response.value };  // response.value is from your backend api
    })
    .catch(err => throw new Error(err.message));
  }
};
```

If your application integgrate with `Redux`, you may need to dispatch an action in `cellEdit.onUpdate` callback. In this circumstances, you need to return `false` explicity which `react-bootstrap-table2` will stop any operation internally and wait rerender by your application.

In a simple redux application, you probably need to handle those props by your application:

* [`cellEdit.editing`](#editing): Is cell still on editing or not? This value should always be `true` when saving cell failure.
* [`cellEdit.errorMessage`](#errorMessage): Error message when save the cell failure.
* [`cellEdit.onErrorMessageDisappear`](#onErrorMessageDisappear): This callback will be called when error message alert closed automatically.
* `cellEdit.onUpdate`

```js
const cellEdit = {
  editing: this.props.editing,
  errorMessage: this.props.errorMessage,
  onErrorMessageDisappear: () => {
    // cleanErrorMessage is an action creator
    this.props.dispatch(cleanErrorMessage());
  },
  onUpdate: (rowId, dataField, newValue) => {
    // updateCell is an action creator
    this.props.dispatch(updateCell(rowId, dataField, newValue)));
    return false;  // Have to return false here
  }
};
```

Please check [this](https://github.com/react-bootstrap-table/react-bootstrap-table2/blob/develop/packages/react-bootstrap-table2-example/examples/cell-edit/cell-edit-with-redux-table.js) exmaple to learn how use `cellEdit` with a redux application

### <a name='editing'>cellEdit.editing - [Bool]</a>
This only used when you want to control cell saving externally, `cellEdit.editing` will be a flag to tell `react-bootstrap-table2` whether currecnt editing cell is still editing or not. Because, it's possible that some error happen when you saving cell, in this situation, you need to configre this value as `false` to keep the cell as edtiable and show up an error message.

### <a name='errorMessage'>cellEdit.errorMessage - [String]</a>
Same as [`cellEdit.editing`](#editing). This prop is not often used. Only used when you keep the error message in your application state.

### <a name='onErrorMessageDisappear'>cellEdit.onErrorMessageDisappear - [Function]</a>
This callback function will be called when error message discard.

