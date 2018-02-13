/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { DropDownEditor } from 'react-bootstrap-table2-editor';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const items = [
  'Item name 0',
  'Item name 1',
  'Item name 2',
  'Item name 3',
  'Item name 4'
];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  editor: (<DropDownEditor dropDownKey="productName" items={ items } />)
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { DropDownEditor } from 'react-bootstrap-table2-editor';

const items = [
  'Item name 0',
  'Item name 1',
  'Item name 2',
  'Item name 3',
  'Item name 4'
];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  editor: (<DropDownEditor dropDownKey="productName" items={ items } />)
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
    afterSaveCell: (oldValue, newValue, row, column) => { console.log(\`Dropdown select from '\${oldValue}' to '\${newValue}'\`); }
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
        afterSaveCell: (oldValue, newValue, row, column) => { console.log(`Dropdown select from '${oldValue}' to '${newValue}'`); }
      }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
