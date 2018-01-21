/* eslint no-unused-vars: 0 */

import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  // here, we implement a custom sort which perform a reverse sorting
  sortFunc: (a, b, order, dataField) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  // here, we implement a custom sort which perform a reverse sorting
  sortFunc: (a, b, order, dataField) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <h3>Product ID sorting is reverted</h3>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
