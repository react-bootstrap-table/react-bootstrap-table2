/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  attrs: { title: 'id column' }
}, {
  dataField: 'name',
  text: 'Product Name',
  attrs: (cell, row, rowIndex, colIndex) => ({ 'data-test': `customized data ${rowIndex}` })
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  attrs: { title: 'id column' }
}, {
  dataField: 'name',
  text: 'Product Name',
  attrs: (cell, row, rowIndex, colIndex) => ({ 'data-test': \`customized data \${rowIndex}\` })
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
