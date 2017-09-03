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
      price: 2100 + i,
      onSale: Math.random() >= 0.5
    });
  }
}

addProducts(5);

function priceFormatter(column, colIndex) {
  return (
    <h5><strong>$$ { column.text } $$</strong></h5>
  );
}

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  headerFormatter: priceFormatter
}];

const sourceCode = `\
function priceFormatter(column, colIndex) {
  return (
    <h5><strong>$$ { column.text } $$</strong></h5>
  );
}

const columns = [
// omit...
{
  dataField: 'price',
  text: 'Product Price',
  headerFormatter: priceFormatter
}];

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
