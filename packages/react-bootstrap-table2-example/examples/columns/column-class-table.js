/* eslint no-unused-vars: 0 */
import React from 'react';

import { BootstrapTable } from 'react-bootstrap-table2';
import Code from 'common/codeBlock';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i += 1) {
    const id = startId + i;
    products.push({
      id,
      name: `Item name ${id}`,
      price: 2100 + i
    });
  }
}

addProducts(5);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  classes: 'demo-key-row'
}, {
  dataField: 'name',
  text: 'Product Name',
  classes: (cell, row, colIndex) => {
    if (row.id % 2 === 0) return 'demo-row-even';
    return 'demo-row-odd';
  }
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  classes: 'demo-key-row'
}, {
  dataField: 'name',
  text: 'Product Name',
  classes: (cell, row, colIndex) => {
    if (row.id % 2 === 0) return 'demo-row-even';
    return 'demo-row-odd';
  }
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
