/* eslint no-unused-vars: 0 */
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

const selectRow1 = {
  mode: 'checkbox',
  clickToSelect: true,
  style: { backgroundColor: '#c8e6c9' }
};

const selectRow2 = {
  mode: 'checkbox',
  clickToSelect: true,
  style: (row, rowIndex) => {
    const backgroundColor = rowIndex > 1 ? '#00BFFF' : '#00FFFF';
    return { backgroundColor };
  }
};

const sourceCode1 = `\
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
  style: { backgroundColor: '#c8e6c9' }
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRow }
/>
`;

const sourceCode2 = `\
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
  style: (row, rowIndex) => {
    const backgroundColor = rowIndex > 1 ? '#00BFFF' : '#00FFFF';
    return { backgroundColor };
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
    <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow1 } />
    <Code>{ sourceCode1 }</Code>
    <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow2 } />
    <Code>{ sourceCode2 }</Code>
  </div>
);
