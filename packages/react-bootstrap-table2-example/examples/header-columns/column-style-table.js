/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  headerStyle: {
    backgroundColor: '#c8e6c9'
  }
}, {
  dataField: 'price',
  text: 'Product Price',
  headerStyle: (column, colIndex) => {
    if (colIndex % 2 === 0) {
      return {
        backgroundColor: '#81c784'
      };
    }
    return {
      backgroundColor: '#c8e6c9'
    };
  }
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  headerStyle: {
    backgroundColor: '#c8e6c9'
  }
}, {
  dataField: 'price',
  text: 'Product Price',
  headerStyle: (column, colIndex) => {
    if (colIndex % 2 === 0) {
      return {
        backgroundColor: '#81c784'
      };
    }
    return {
      backgroundColor: '#c8e6c9'
    };
  }
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
