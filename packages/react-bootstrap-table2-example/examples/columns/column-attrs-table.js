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
import BootstrapTable from 'react-bootstrap-table-next';

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
    <h3>Try to hover on Product ID Cell</h3>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
