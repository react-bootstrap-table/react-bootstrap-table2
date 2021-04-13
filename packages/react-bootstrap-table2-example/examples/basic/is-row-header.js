import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'name',
  text: 'Product Name',
  isRowHeader: true,
  attrs: { scope: 'col' },
  headerAttrs: { scope: 'row' }
}, {
  dataField: 'id',
  text: 'Product ID',
  headerAttrs: { scope: 'row' }
}, {
  dataField: 'price',
  text: 'Product Price',
  headerAttrs: { scope: 'row' }
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  headerAttrs: { scope: 'row' }
}, {
  dataField: 'name',
  text: 'Product Name',
  isRowHeader: true,
  attrs: { scope: 'col' },
  headerAttrs: { scope: 'row' }
}, {
  dataField: 'price',
  text: 'Product Price',
  headerAttrs: { scope: 'row' }
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
