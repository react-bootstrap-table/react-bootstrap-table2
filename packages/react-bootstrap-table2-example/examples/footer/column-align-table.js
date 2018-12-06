/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  footerAlign: 'center',
  footer: 'Footer 1'
}, {
  dataField: 'name',
  text: 'Product Name',
  footerAlign: (column, colIndex) => 'right',
  footer: 'Footer 2'
}, {
  dataField: 'price',
  text: 'Product Price',
  footer: 'Footer 3'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  footerAlign: 'center',
  footer: 'Footer 1'
}, {
  dataField: 'name',
  text: 'Product Name',
  footerAlign: (column, colIndex) => 'right',
  footer: 'Footer 2'
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
