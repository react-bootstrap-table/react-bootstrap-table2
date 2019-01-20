/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';

import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [
  {
    dataField: 'id',
    text: 'Product ID',
    footer: 'Footer 1'
  },
  {
    dataField: 'name',
    text: 'Product Name',
    footer: 'Footer 2'
  },
  {
    dataField: 'price',
    text: 'Product Price',
    footer: columnData => columnData.reduce((acc, item) => acc + item, 0)
  }
];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
// omit...
{
    dataField: 'price',
    text: 'Product Price',
    footer: columnData => columnData.reduce((acc, item) => acc + item, 0)
  }];

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
/>
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{sourceCode}</Code>
  </div>
);
