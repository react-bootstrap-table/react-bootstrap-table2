/* eslint no-unused-vars: 0 */
import React from 'react';

import { BootstrapTableful } from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  headerAttrs: { title: 'ID header column' }
}, {
  dataField: 'name',
  text: 'Product Name',
  headerAttrs: (column, colIndex) => ({ 'data-test': `customized data ${colIndex}` })
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  headerAttrs: { title: 'ID header column' }
}, {
  dataField: 'name',
  text: 'Product Name',
  headerAttrs: (column, colIndex) => ({ 'data-test': \`customized data \${colIndex}\` })
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTableful keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTableful keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
