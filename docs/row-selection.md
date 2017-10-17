
# Row selection
`react-bootstrap-table2` supports the row selection feature. By passing prop `selectRow ` to enable row selection. When you enable this feature, `react-bootstrap-table2` will append a new selection column at first. 


## Available properties

The following are available properties in `selectRow`:

#### Required
* [mode (required)](#mode)

#### Optional

## <a name="mode">selectRow.mode - [String]</a>

Specifying the selection way for `single(radio)` or `multiple(checkbox)`. If `radio` was assigned, there will be a radio button in the selection column; otherwise, the `checkbox` instead.

#### values
* `radio`
* `checkbox`

#### examples

```js
const selectRowProp = {
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
const selectRowProp = {
  mode: 'checkbox' // multiple row selection
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRowProp }
/>
```
