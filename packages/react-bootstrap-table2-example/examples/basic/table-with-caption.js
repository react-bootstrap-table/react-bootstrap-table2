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

const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Component as Header</h3>;

<BootstrapTableful keyField="id" data={ products } caption="Plain text header" columns={ columns } />

<BootstrapTableful keyField="id" data={ products } caption={<CaptionElement />} columns={ columns } />
`;

const Caption = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Component as Header</h3>;

export default () => (
  <div>
    <BootstrapTableful keyField="id" data={ products } caption="Plain text header" columns={ columns } />
    <BootstrapTableful keyField="id" data={ products } caption={<Caption />} columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
