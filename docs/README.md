# Documentation

## BootstrapTable Props

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
Tells `react-bootstrap-table2` which column is unique.

### <a name='data'>data(**required**) - [Array]</a>
Provides data for your table. It accepts a single Array object.

### <a name='columns'>columns(**required**) - [Object]</a>
Accepts a single Array object, please see [columns definition](./columns.md) for more detail.

### <a name='caption'>caption - [String | Node]</a>
Same as HTML [caption tag](https://www.w3schools.com/TAgs/tag_caption.asp), you can set it as String or a React JSX.

### <a name='striped'>striped - [Bool]</a>
Same as bootstrap `.table-striped` class for adding zebra-stripes to a table.
### <a name='bordered'>bordered - [Bool]</a>
Same as bootstrap `.table-bordered` class for adding borders to a table and table cells.
### <a name='hover'>hover - [Bool]</a>
Same as bootstrap `.table-hover` class for adding mouse hover effect (grey background color) on table rows.
### <a name='condensed'>condensed - [Bool]</a>
Same as bootstrap `.table-condensed` class for making a table more compact by cutting cell padding in half.

### <a name='cellEdit'>cellEdit - [Object]</a>
Makes table cells editable, please see [cellEdit definition](./cell-edit.md) for more detail.

### <a name='selectRow'>selectRow - [Object]</a>
Makes table rows selectable, please see [selectRow definition](./row-selection.md) for more detail.