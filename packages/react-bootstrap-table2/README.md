# react-bootstrap-table-next
Next generation of [`react-bootstrap-table`](https://github.com/AllenFang/react-bootstrap-table)

## Usage

### Installation

```sh
npm install react-bootstrap-table-next --save
```

### Include CSS

> react-bootstrap-table2 need you to add bootstrap css in your application firstly. About bootstrap css, we only compatible with bootstrap 3 but will start to compatible for bootstrap 4 on v0.2.0

```js
// es5 
require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');

// es6
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
```

### Your First Table

```js
import BootstrapTable from 'react-bootstrap-table-next';

const products = [ ... ];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default () =>
  <BootstrapTable keyField='id' data={ products } columns={ columns } />
```