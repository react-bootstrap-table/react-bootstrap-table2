/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
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

const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(`clicked on row with index: ${rowIndex}`);
  },
  onMouseEnter: (e, row, rowIndex) => {
    console.log(`enter on row with index: ${rowIndex}`);
  }
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

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

const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(\`clicked on row with index: \${rowIndex}\`);
  },
  onMouseEnter: (e, row, rowIndex) => {
    console.log(\`enter on row with index: \${rowIndex}\`);
  }
};

<BootstrapTable keyField='id' data={ products } columns={ columns } rowEvents={ rowEvents } />
`;

export default () => (
  <div>
    <h3>Try to click or hover on any rows</h3>
    <BootstrapTable keyField="id" data={ products } columns={ columns } rowEvents={ rowEvents } />
    <Code>{ sourceCode }</Code>
  </div>
);
