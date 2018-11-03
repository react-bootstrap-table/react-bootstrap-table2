import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(87);

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

const style = `\
// Customizing your own sticky table style by simply overwriting .table-sticky
.react-bootstrap-table {
  .sticky.table-sticky {
    tbody {
      max-height: 200px;
    }
  }
}
`;

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

<BootstrapTable sticky classes="sticky" keyField="id" data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable sticky classes="sticky" keyField="id" data={ products } columns={ columns } />

    <Code>{ style }</Code>
    <Code>{ sourceCode }</Code>
  </div>
);
