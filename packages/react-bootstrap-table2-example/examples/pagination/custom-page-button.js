/* eslint react/prefer-stateless-function: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
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

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// ...

const pageButtonRenderer = ({
  page,
  active,
  disable,
  title,
  onPageChange
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  const activeStyle = {};
  if (active) {
    activeStyle.backgroundColor = 'black';
    activeStyle.color = 'white';
  } else {
    activeStyle.backgroundColor = 'gray';
    activeStyle.color = 'black';
  }
  if (typeof page === 'string') {
    activeStyle.backgroundColor = 'white';
    activeStyle.color = 'black';
  }
  return (
    <li className="page-item">
      <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
    </li>
  );
};

const options = {
  pageButtonRenderer
};

<BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
`;

const pageButtonRenderer = ({
  page,
  active,
  disable,
  title,
  onPageChange
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  const activeStyle = {};
  if (active) {
    activeStyle.backgroundColor = 'black';
    activeStyle.color = 'white';
  } else {
    activeStyle.backgroundColor = 'gray';
    activeStyle.color = 'black';
  }
  if (typeof page === 'string') {
    activeStyle.backgroundColor = 'white';
    activeStyle.color = 'black';
  }
  return (
    <li className="page-item">
      <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
    </li>
  );
};

const options = {
  pageButtonRenderer
};

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    <Code>{ sourceCode }</Code>
  </div>
);
