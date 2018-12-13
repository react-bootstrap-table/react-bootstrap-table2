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
  footerClasses: 'demo-row-odd'
}, {
  dataField: 'price',
  text: 'Product Price',
  footer: 'Footer 3',
  footerClasses: (column, colIndex) => {
    if (colIndex % 2 === 0) return 'demo-row-even';
    return 'demo-row-odd';
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
    footerClasses: 'demo-row-odd'
  }, {
    dataField: 'price',
    text: 'Product Price',
    footer: 'Footer 3',
    footerClasses: (column, colIndex) => {
      if (colIndex % 2 === 0) return 'demo-row-even';
      return 'demo-row-odd';
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
