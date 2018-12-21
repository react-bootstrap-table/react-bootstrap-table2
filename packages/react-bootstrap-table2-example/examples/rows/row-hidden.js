/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(`clicked on row with index: ${rowIndex}`);
  },
  onMouseEnter: (e, row, rowIndex) => {
    console.log(`enter on row with index: ${rowIndex}`);
  }
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const hiddenRowKeys = [1, 3];

<BootstrapTable keyField="id" data={ products } columns={ columns } hiddenRows={ hiddenRowKeys } />
`;

const hiddenRowKeys = [1, 3];

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } hiddenRows={ hiddenRowKeys } />
    <Code>{ sourceCode }</Code>
  </div>
);
