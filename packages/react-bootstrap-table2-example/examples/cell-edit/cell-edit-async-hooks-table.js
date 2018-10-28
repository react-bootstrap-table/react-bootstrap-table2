/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
/* eslint no-alert: 0 */
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

function beforeSaveCell(oldValue, newValue, row, column, done) {
  setTimeout(() => {
    if (confirm('Do you want to accep this change?')) {
      done(true);
    } else {
      done(false);
    }
  }, 0);
  return { async: true };
}

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
  cellEdit={ cellEditFactory({
    mode: 'click',
    beforeSaveCell
  }) }
/>
`;

function beforeSaveCell(oldValue, newValue, row, column, done) {
  setTimeout(() => {
    if (confirm('Do you want to accep this change?')) {
      done(true);
    } else {
      done(false);
    }
  }, 0);
  return { async: true };
}

export default () => (
  <div>
    <h2>You will get a confirm prompt when you try to save a cell</h2>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        beforeSaveCell
      }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
