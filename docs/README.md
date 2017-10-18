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
`cellEdit` allow you to enable cell editing on table, please see [cellEdit definition](./cell-edit.md) for more detail.

### <a name='selectRow'>selectRow - [Object]</a>
`selectRow` allow you to have a mechanism to select rows, please see [selectRow definition](./row-selection.md) for more detail.