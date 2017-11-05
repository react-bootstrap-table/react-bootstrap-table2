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

const sortingHeaderClasses = (column, colIndex) => 'demo-sorting';

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

const sortingHeaderClasses = (column, colIndex) => 'demo-sorting';

<BootstrapTable keyField="id" data={ products } columns={ columns } sortingHeaderClasses={ sortingHeaderClasses } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } sortingHeaderClasses={ sortingHeaderClasses } />
    <Code>{ sourceCode }</Code>
  </div>
);
