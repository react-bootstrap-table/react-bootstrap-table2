/* eslint prefer-template: 0 */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Code from 'components/common/code-block';
import { stockGenerator } from 'utils/common';

const products = stockGenerator();

const columns = [{
  dataField: 'id',
  text: 'Stock ID'
}, {
  dataField: 'name',
  text: 'Stock Name'
}, {
  dataField: 'price',
  text: 'Price',
  type: 'number'
}, {
  dataField: 'visible',
  text: 'Visible?',
  type: 'bool',
  editor: {
    type: Type.CHECKBOX,
    value: 'true:false'
  }
}, {
  dataField: 'inStockDate',
  text: 'Stock Date',
  type: 'date',
  formatter: (cell) => {
    let dateObj = cell;
    if (typeof cell !== 'object') {
      dateObj = new Date(cell);
    }
    return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
  },
  editor: {
    type: Type.DATE
  }
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const columns = [{
  dataField: 'id',
  text: 'Stock ID'
}, {
  dataField: 'name',
  text: 'Stock Name'
}, {
  dataField: 'price',
  text: 'Price',
  type: 'number'
}, {
  dataField: 'visible',
  text: 'Visible?',
  type: 'bool',
  editor: {
    type: Type.CHECKBOX,
    value: 'true:false'
  }
}, {
  dataField: 'inStockDate',
  text: 'Stock Date',
  type: 'date',
  formatter: (cell) => {
    let dateObj = cell;
    if (typeof cell !== 'object') {
      dateObj = new Date(cell);
    }
    return \`$\{('0' + dateObj.getUTCDate()).slice(-2)}/$\{('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/$\{dateObj.getUTCFullYear()}\`;
  },
  editor: {
    type: Type.DATE
  }
}];

function afterSaveCell(oldValue, newValue) {
  console.log('--after save cell--');
  console.log('New Value was apply as');
  console.log(newValue);
  console.log(\`and the type is $\{typeof newValue}\`);
}

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
  cellEdit={ cellEditFactory({
    mode: 'click',
    blurToSave: true,
    afterSaveCell
  }) }
/>
`;

function afterSaveCell(oldValue, newValue) {
  console.log('--after save cell--'); // eslint-disable-line no-console
  console.log('New Value was apply as'); // eslint-disable-line no-console
  console.log(newValue); // eslint-disable-line no-console
  console.log(`and the type is ${typeof newValue}`); // eslint-disable-line no-console
}

export default () => (
  <div>
    <h3>Save Cell Value with Specified Data Type</h3>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true,
        afterSaveCell
      }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
