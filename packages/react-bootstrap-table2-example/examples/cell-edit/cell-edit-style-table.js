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
  text: 'Product Name',
  editCellStyle: {
    backgroundColor: '#20B2AA'
  }
}, {
  dataField: 'price',
  text: 'Product Price',
  editCellStyle: (cell, row, rowIndex, colIndex) => {
    const backgroundColor = cell > 2101 ? '#00BFFF' : '#00FFFF';
    return { backgroundColor };
  }
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  editCellStyle: {
    backgroundColor: '#20B2AA'
  }
}, {
  dataField: 'price',
  text: 'Product Price',
  editCellStyle: (cell, row, rowIndex, colIndex) => {
    const backgroundColor = cell > 2101 ? '#00BFFF' : '#00FFFF';
    return { backgroundColor };
  }
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
