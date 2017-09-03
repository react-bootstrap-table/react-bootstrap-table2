/* eslint no-unused-vars: 0 */
import React from 'react';

import { BootstrapTableful } from 'react-bootstrap-table2';
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
  align: 'center'
}, {
  dataField: 'name',
  text: 'Product Name',
  align: (cell, row, colIndex) => {
    if (row.id % 2 === 0) return 'right';
    return 'left';
  }
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  align: 'center'
}, {
  dataField: 'name',
  text: 'Product Name',
  align: (cell, row, colIndex) => {
    if (row.id % 2 === 0) return 'right';
    return 'left';
  }
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTableful keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTableful keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
