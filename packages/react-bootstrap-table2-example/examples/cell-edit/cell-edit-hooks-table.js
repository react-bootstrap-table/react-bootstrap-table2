/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
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
  cellEdit={ cellEditFactory({
    mode: 'click',
    onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
    beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
    afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
  }) }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('Start to edit!!!'); },
        beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
        afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
      }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
