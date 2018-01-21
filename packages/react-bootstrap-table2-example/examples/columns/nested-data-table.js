import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(5, (value, index) => ({
  id: index,
  name: `User Name ${index}`,
  phone: 21009831 + index,
  address: {
    city: 'New York',
    postCode: '1111-4512'
  }
}));

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
import BootstrapTable from 'react-bootstrap-table-next';

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
