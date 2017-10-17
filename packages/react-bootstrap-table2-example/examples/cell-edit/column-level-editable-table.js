import React from 'react';

import BootstrapTable from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  editable: false
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
  // Product Name column can't be edit anymore
  editable: false
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const cellEdit = {
  mode: 'click',
  blurToSave: true
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  cellEdit={ cellEdit }
/>
`;

const cellEdit = {
  mode: 'click',
  blurToSave: true
};
export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } cellEdit={ cellEdit } />
    <Code>{ sourceCode }</Code>
  </div>
);
