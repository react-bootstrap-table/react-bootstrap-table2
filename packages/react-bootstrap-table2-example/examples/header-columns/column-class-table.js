/* eslint no-unused-vars: 0 */
import React from 'react';

import { BootstrapTableful } from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  headerClasses: 'demo-row-odd'
}, {
  dataField: 'price',
  text: 'Product Price',
  headerClasses: (column, colIndex) => {
    if (colIndex % 2 === 0) return 'demo-row-even';
    return 'demo-row-odd';
  }
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  headerClasses: 'demo-row-odd'
}, {
  dataField: 'price',
  text: 'Product Price',
  headerClasses: (column, colIndex) => {
    if (colIndex % 2 === 0) return 'demo-row-even';
    return 'demo-row-odd';
  }
}];

<BootstrapTableful keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTableful keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
