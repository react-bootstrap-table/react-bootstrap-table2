/* eslint no-unused-vars: 0 */
/* eslint no-alert: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  footer: 'Footer 1'
}, {
  dataField: 'name',
  text: 'Product Name',
  footer: 'Footer 2',
  footerStyle: {
    backgroundColor: '#c8e6c9'
  }
}, {
  dataField: 'price',
  text: 'Product Price',
  footer: 'Footer 3',
  footerStyle: (column, colIndex) => {
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
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'Product ID',
    footer: 'Footer 1'
  }, {
    dataField: 'name',
    text: 'Product Name',
    footer: 'Footer 2',
    footerStyle: {
      backgroundColor: '#c8e6c9'
    }
  }, {
    dataField: 'price',
    text: 'Product Price',
    footer: 'Footer 3',
    footerStyle: (column, colIndex) => {
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
