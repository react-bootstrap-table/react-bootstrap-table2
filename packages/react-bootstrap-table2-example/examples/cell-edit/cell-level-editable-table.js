/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
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
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

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

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
  cellEdit={ cellEditFactory({ mode: 'click' }) }
/>
`;

export default () => (
  <div>
    <h3>Only Product Price is bigger than 2101 is editable</h3>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
