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

const rowStyle1 = { backgroundColor: '#c8e6c9' };

const sourceCode1 = `\
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

const rowStyle = { backgroundColor: '#c8e6c9' };

<BootstrapTable keyField='id' data={ products } columns={ columns } rowStyle={ rowStyle } />
`;

const rowStyle2 = (row, rowIndex) => {
  const style = {};
  if (row.id > 3) {
    style.backgroundColor = '#c8e6c9';
  } else {
    style.backgroundColor = '#00BFFF';
  }

  if (rowIndex > 2) {
    style.fontWeight = 'bold';
    style.color = 'white';
  }

  return style;
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

const rowStyle2 = (row, rowIndex) => {
  const style = {};
  if (row.id > 3) {
    style.backgroundColor = '#c8e6c9';
  } else {
    style.backgroundColor = '#00BFFF';
  }

  if (rowIndex > 2) {
    style.fontWeight = 'bold';
    style.color = 'white';
  }

  return style;
};

<BootstrapTable keyField='id' data={ products } columns={ columns } rowStyle={ rowStyle2 } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } rowStyle={ rowStyle1 } />
    <Code>{ sourceCode1 }</Code>
    <BootstrapTable keyField="id" data={ products } columns={ columns } rowStyle={ rowStyle2 } />
    <Code>{ sourceCode2 }</Code>
  </div>
);
