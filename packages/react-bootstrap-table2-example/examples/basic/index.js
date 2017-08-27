import React from 'react';

import { BootstrapTable } from 'react-bootstrap-table2';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i += 1) {
    const id = startId + i;
    products.push({
      id,
      name: `Item name ${id}`,
      price: 2100 + i,
      nest: {
        address: 'Address 1',
        postcal: '0922-1234'
      }
    });
  }
}

addProducts(5);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  style: {
    backgroundColor: 'red'
  },
  headerTitle: (column, colIndex) => 'yes~~~ oh', // eslint-disable-line no-unused-vars
  classes: 'my-xxx'
}, {
  dataField: 'name',
  text: 'Product Name',
  headerTitle: true,
  formatter: (cell, row) =>
    (<h3>{ cell }::: ${ row.price }</h3>)
}, {
  dataField: 'price',
  text: 'Product Price',
  style: (cell, row, colIndex) => ({ // eslint-disable-line no-unused-vars
    backgroundColor: 'blue'
  })
}, {
  dataField: 'nest.address',
  text: 'Address'
}, {
  dataField: 'nest.postcal',
  text: 'Postal'
}];

export default () => <BootstrapTable keyField="id" data={ products } columns={ columns } />;
