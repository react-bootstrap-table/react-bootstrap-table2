/* eslint no-unused-vars: 0 */

import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  // here, we implement a custom sort which perform a reverse sorting
  sortFunc: (a, b, order, dataField) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  // here, we implement a custom sort which perform a reverse sorting
  sortFunc: (a, b, order, dataField) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sortCaret = (sortOrder, column) => {
  if (sortOrder === 'asc') {
    return <span className="glyphicon glyphicon-arrow-up" aria-hidden="true" />;
  } else if (sortOrder === 'desc') {
    return <span className="glyphicon glyphicon-arrow-down" aria-hidden="true" />;
  }
  return <span />;
};

<BootstrapTable keyField='id' data={ products } columns={ columns } sortCaretRenderer={ sortCaret }/>
`;

const sortCaret = (sortOrder) => {
  if (sortOrder === 'asc') {
    return <span className="glyphicon glyphicon-arrow-down" aria-hidden="true" />;
  } else if (sortOrder === 'desc') {
    return <span className="glyphicon glyphicon-arrow-up" aria-hidden="true" />;
  }
  return <span />;
};

export default () => (
  <div>
    <h3>Product ID sorting is reverted</h3>
    <BootstrapTable keyField="id" data={ products } columns={ columns } sortCaretRenderer={ sortCaret } />
    <Code>{ sourceCode }</Code>
  </div>
);
