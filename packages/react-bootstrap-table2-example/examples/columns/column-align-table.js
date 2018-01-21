/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  align: 'center'
}, {
  dataField: 'name',
  text: 'Product Name',
  align: (cell, row, rowIndex, colIndex) => {
    if (rowIndex % 2 === 0) return 'right';
    return 'left';
  }
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  align: 'center'
}, {
  dataField: 'name',
  text: 'Product Name',
  align: (cell, row, rowIndex, colIndex) => {
    if (rowIndex % 2 === 0) return 'right';
    return 'left';
  }
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
