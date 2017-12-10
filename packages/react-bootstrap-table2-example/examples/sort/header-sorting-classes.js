/* eslint
  no-unused-vars: 0
  arrow-body-style: 0
*/

import React from 'react';

import BootstrapTable from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => (
  sortOrder === 'asc' ? 'demo-sorting-asc' : 'demo-sorting-desc'
);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  headerSortingClasses
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  headerSortingClasses
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => (
  sortOrder === 'asc' ? 'demo-sorting-asc' : 'demo-sorting-desc'
);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  headerSortingClasses
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  headerSortingClasses
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
