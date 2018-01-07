/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table2';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  editCellClasses: 'editing-name'
}, {
  dataField: 'price',
  text: 'Product Price',
  editCellClasses: (cell, row, rowIndex, colIndex) =>
    (cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101')
}];

const sourceCode = `\
import cellEditFactory from 'react-bootstrap-table2-editor';
// ...
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  editCellClasses: 'editing-name'
}, {
  dataField: 'price',
  text: 'Product Price',
  editCellClasses: (cell, row, rowIndex, colIndex) =>
    (cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101')
}];

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
  cellEdit={ cellEditFactory({ mode: 'click' }) }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
