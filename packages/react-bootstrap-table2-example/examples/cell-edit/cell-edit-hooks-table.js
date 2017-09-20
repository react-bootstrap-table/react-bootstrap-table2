/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
import React from 'react';

import { BootstrapTableful } from 'react-bootstrap-table2';
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

const cellEdit = {
  mode: 'click',
  beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
  afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
};

<BootstrapTableful
  keyField='id'
  data={ products }
  columns={ columns }
  cellEdit={ cellEdit }
/>
`;

const cellEdit = {
  mode: 'click',
  beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
  afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
};
export default () => (
  <div>
    <BootstrapTableful keyField="id" data={ products } columns={ columns } cellEdit={ cellEdit } />
    <Code>{ sourceCode }</Code>
  </div>
);
