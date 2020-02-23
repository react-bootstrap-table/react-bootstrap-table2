/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

function priceFormatter(column, colIndex, { text }) {
  return (
    <h5>
      <strong>$$ {column.text} $$</strong>
    </h5>
  );
}

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
    footer: 'Footer 3',
    footerFormatter: priceFormatter
  }
];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

function priceFormatter(column, colIndex, { text }) {
  return (
    <h5><strong>$$ { column.text } $$</strong></h5>
  );
}

const columns = [
// omit...
{
  dataField: 'price',
  text: 'Product Price',
  footer: 'Footer 3',
  footerFormatter: priceFormatter
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
