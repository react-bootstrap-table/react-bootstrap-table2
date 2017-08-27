# Documents

## Props on BootstrapTable

### <a name='keyField'>keyField(**required**) - [String]</a>
`keyField` is a prop to tell `react-bootstrap-table2` which column is unigue key.

### <a name='data'>data(**required**) - [Array]</a>
Assign your table data via `data` prop. It only accept an Array object.

### <a name='columns'>columns(**required**) - [Object]</a>
`columns` props accept an Array object, please see [columns definition](./columns.md) for more detail.

### <a name='striped'>striped - [Bool]</a>
Same as `.table-striped` class for adding zebra-stripes to a table
### <a name='bordered'>bordered - [Bool]</a>
Same as `.table-bordered` class for adding borders on all sides of the table and cells
### <a name='hover'>hover - [Bool]</a>
Same as `.table-hover` class for adding a hover effect (grey background color) on table rows
### <a name='condensed'>condensed - [Bool]</a>
Same as `.table-condensed` class for makeing a table more compact by cutting cell padding in half