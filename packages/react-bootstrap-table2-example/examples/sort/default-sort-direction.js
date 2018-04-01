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
  keyField="id"
  data={ products }
  columns={ columns }
  defaultSortDirection="asc"
/>
`;


class DefaultSortDirectionTable extends React.PureComponent {
  render() {
    return (
      <div>
        <BootstrapTable keyField="id" data={ products } columns={ columns } defaultSortDirection="asc" />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}

export default DefaultSortDirectionTable;
