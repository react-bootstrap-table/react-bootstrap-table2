/* eslint prefer-template: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Code from 'components/common/code-block';
import { stockGenerator } from 'utils/common';

const stocks = stockGenerator();

const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'inStockDate',
  text: 'Stock Date',
  formatter: (cell) => {
    let dateObj = cell;
    if (typeof cell !== 'object') {
      dateObj = new Date(cell);
    }
    return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
  },
  editor: {
    type: Type.DATE
  }
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'inStockDate',
  text: 'Stock Date',
  formatter: (cell) => {
    let dateObj = cell;
    if (typeof cell !== 'object') {
      dateObj = new Date(cell);
    }
    return \`$\{('0' + dateObj.getDate()).slice(-2)}/$\{('0' + (dateObj.getMonth() + 1)).slice(-2)}/$\{dateObj.getFullYear()}\`;
  },
  editor: {
    type: Type.DATE
  }
}];

<BootstrapTable
  keyField="id"
  data={ stocks }
  columns={ columns }
  cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
/>
`;

export default () => (
  <div>
    <h3>Dropdown Editor</h3>
    <BootstrapTable
      keyField="id"
      data={ stocks }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
