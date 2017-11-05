/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sortingHeaderStyle = { backgroundColor: '#c8e6c9' };

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sortingHeaderStyle = { backgroundColor: '#c8e6c9' };

<BootstrapTable keyField="id" data={ products } columns={ columns } sortingHeaderStyle={ sortingHeaderStyle } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } sortingHeaderStyle={ sortingHeaderStyle } />
    <Code>{ sourceCode }</Code>
  </div>
);
