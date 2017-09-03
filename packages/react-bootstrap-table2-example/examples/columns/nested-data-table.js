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
      name: `User Name ${id}`,
      phone: 21009831 + i,
      address: {
        city: 'New York',
        postCode: '1111-4512'
      }
    });
  }
}

addProducts(5);

const columns = [{
  dataField: 'id',
  text: 'User ID'
}, {
  dataField: 'name',
  text: 'User Name'
}, {
  dataField: 'phone',
  text: 'Phone'
}, {
  dataField: 'address.city',
  text: 'City'
}, {
  dataField: 'address.postCode',
  text: 'PostCode'
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'User ID'
}, {
  dataField: 'name',
  text: 'User Name'
}, {
  dataField: 'phone',
  text: 'Phone'
}, {
  dataField: 'address.city',
  text: 'City'
}, {
  dataField: 'address.postCode',
  text: 'PostCode'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
