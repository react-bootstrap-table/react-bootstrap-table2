/* eslint react/prefer-stateless-function: 0 */
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
  text: 'Product Price'
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
  text: 'Product Price'
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
    <h3>Click to edit cell</h3>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
