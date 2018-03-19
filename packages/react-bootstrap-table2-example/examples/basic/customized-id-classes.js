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

<BootstrapTable id="bar" keyField='id' data={ products } columns={ columns } />
<BootstrapTable classes="foo" keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <h4> Customized table ID </h4>
    <BootstrapTable id="bar" keyField="id" data={ products } columns={ columns } />

    <h4> Customized table className </h4>
    <BootstrapTable classes="foo" keyField="id" data={ products } columns={ columns } />

    <Code>{ sourceCode }</Code>
  </div>
);
