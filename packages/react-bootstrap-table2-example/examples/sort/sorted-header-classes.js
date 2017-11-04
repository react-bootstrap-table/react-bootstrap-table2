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

const sortedHeader = {
  classes: (column, colIndex) => 'demo-sorted'
};

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

const sortedHeader = {
  classes: (column, colIndex) => 'demo-sorted'
};

<BootstrapTable keyField="id" data={ products } columns={ columns } sortedHeader={ sortedHeader } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } sortedHeader={ sortedHeader } />
    <Code>{ sourceCode }</Code>
  </div>
);
