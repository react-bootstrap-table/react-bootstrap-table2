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
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const rowClasses1 = 'custom-row-class';

const sourceCode1 = `\
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

const rowClasses = 'custom-row-class';

<BootstrapTable keyField='id' data={ products } columns={ columns } rowClasses={ rowClasses } />
`;

const rowClasses2 = (row, rowIndex) => {
  let classes = null;

  if (rowIndex > 2) {
    classes = 'index-bigger-than-two';
  }

  return classes;
};

const sourceCode2 = `\
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

const rowClasses = (row, rowIndex) => {
  let classes = null;

  if (rowIndex > 2) {
    classes = 'index-bigger-than-two';
  }

  return classes;
};

<BootstrapTable keyField='id' data={ products } columns={ columns } rowClasses={ rowClasses } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } rowClasses={ rowClasses1 } />
    <Code>{ sourceCode1 }</Code>
    <BootstrapTable keyField="id" data={ products } columns={ columns } rowClasses={ rowClasses2 } />
    <Code>{ sourceCode2 }</Code>
  </div>
);
