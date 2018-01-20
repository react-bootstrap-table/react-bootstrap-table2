/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const headerSortingStyle = { backgroundColor: '#c8e6c9' };

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  headerSortingStyle
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  headerSortingStyle
}, {
  dataField: 'price',
  text: 'Product Price'
}];


const sourceCode = `\
const headerSortingStyle = { backgroundColor: '#c8e6c9' };

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  headerSortingStyle
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  headerSortingStyle
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField="id" data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
