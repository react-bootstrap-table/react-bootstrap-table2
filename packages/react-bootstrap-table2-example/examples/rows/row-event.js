/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const rowEvents = {
  onClick: (e) => {
    console.log('click on row');
  }
};

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const rowEvents = {
  onClick: (e) => {
    console.log('click on row');
  }
};

<BootstrapTable keyField='id' data={ products } columns={ columns } rowStyle={ rowStyle } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } rowEvents={ rowEvents } />
    <Code>{ sourceCode }</Code>
  </div>
);
