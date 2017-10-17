/* eslint no-unused-vars: 0 */
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
  text: 'Product Price',
  editable: (content, row, rowIndex, columnIndex) => content > 2101
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  editable: (content, row, rowIndex, columnIndex) => content > 2101
}];

const cellEdit = {
  mode: 'click'
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  cellEdit={ cellEdit }
/>
`;

const cellEdit = {
  mode: 'click'
};
export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } cellEdit={ cellEdit } />
    <Code>{ sourceCode }</Code>
  </div>
);
