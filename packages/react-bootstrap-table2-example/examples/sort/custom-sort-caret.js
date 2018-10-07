/* eslint no-unused-vars: 0 */
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
  sort: true,
  sortCaret: (order, column) => {
    if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
    else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
    else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
    return null;
  }
}, {
  dataField: 'price',
  text: 'Product Price'
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
  sort: true,
  sortCaret: (order, column) => {
    if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
    else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
    else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
    return null;
  }
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <Code>{ sourceCode }</Code>
  </div>
);
