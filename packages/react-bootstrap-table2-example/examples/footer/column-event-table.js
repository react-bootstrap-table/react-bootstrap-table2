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
  footerEvents: {
    onClick: (e, column, columnIndex) => alert(`Click on Product ID header column, columnIndex: ${columnIndex}`)
  },
  footer: 'Footer 1'
}, {
  dataField: 'name',
  text: 'Product Name',
  footer: 'Footer 2'
}, {
  dataField: 'price',
  text: 'Product Price',
  footer: 'Footer 3'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'Product ID',
    footerEvents: {
      onClick: (e, column, columnIndex) => alert('Click on Product ID footer column')
    },
    footer: 'Footer 1'
  }, {
    dataField: 'name',
    text: 'Product Name',
    footer: 'Footer 2'
  }, {
    dataField: 'price',
    text: 'Product Price',
    footer: 'Footer 3'
  }];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
