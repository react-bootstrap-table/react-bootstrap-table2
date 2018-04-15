
/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

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

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: (row, isSelect, rowIndex, e) => {
    console.log(row.id);
    console.log(isSelect);
    console.log(rowIndex);
    console.log(e);
  },
  onSelectAll: (isSelect, rows, e) => {
    console.log(isSelect);
    console.log(rows);
    console.log(e);
  }
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

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

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  onSelect: (row, isSelect, rowIndex, e) => {
    console.log(row.id);
    console.log(isSelect);
    console.log(rowIndex);
    console.log(e);
  },
  onSelectAll: (isSelect, rows, e) => {
    console.log(isSelect);
    console.log(rows);
    console.log(e);
  }
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRow }
/>
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />
    <Code>{ sourceCode }</Code>
  </div>
);
