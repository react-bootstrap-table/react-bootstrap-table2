/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true
}];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true
}];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

<BootstrapTable
  bootstrap4
  keyField="id"
  data={ products }
  columns={ columns }
  defaultSorted={ defaultSorted } 
/>
`;


export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <BootstrapTable bootstrap4 keyField="id" data={ products } columns={ columns } defaultSorted={ defaultSorted } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
