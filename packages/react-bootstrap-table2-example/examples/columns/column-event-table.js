/* eslint no-unused-vars: 0 */
/* eslint no-alert: 0 */
/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  events: {
    onClick: (e, column, columnIndex, row, rowIndex) => {
      console.log(e);
      console.log(column);
      console.log(columnIndex);
      console.log(row);
      console.log(rowIndex);
      alert('Click on Product ID field');
    },
    onMouseEnter: (e, column, columnIndex, row, rowIndex) => {
      console.log(e);
      console.log(column);
      console.log(columnIndex);
      console.log(row);
      console.log(rowIndex);
      console.log('onMouseEnter on Product ID field');
    }
  }
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  events: {
    onClick: (e, column, columnIndex, row, rowIndex) => {
      console.log(e);
      console.log(column);
      console.log(columnIndex);
      console.log(row);
      console.log(rowIndex);
      alert('Click on Product ID field');
    },
    onMouseEnter: (e, column, columnIndex, row, rowIndex) => {
      console.log(e);
      console.log(column);
      console.log(columnIndex);
      console.log(row);
      console.log(rowIndex);
      console.log('onMouseEnter on Product ID field');
    }
  }
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <h3>Try to Click or Mouse over on Product ID columns</h3>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
