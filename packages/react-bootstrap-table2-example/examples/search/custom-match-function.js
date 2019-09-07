/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const { SearchBar } = Search;
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
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;
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

// Implement startWith instead of contain 
function customMatchFunc({
  searchText,
  value,
  column,
  row
}) {
  if (typeof value !== 'undefined') {
    return value.startsWith(searchText);
  }
  return false;
}

export default () => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search={ { customMatchFunc } }
    >
      {
        props => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar { ...props.searchProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
`;

// Implement startWith instead of contain 
function customMatchFunc({
  searchText,
  value,
  column,
  row
}) {
  if (typeof value !== 'undefined') {
    return `${value}`.toLowerCase().startsWith(searchText.toLowerCase());
  }
  return false;
}

export default () => (
  <div>
    <h1>Custom a search match function by startWith instead of contain</h1>
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search={ { onColumnMatch: customMatchFunc } }
    >
      {
        props => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar { ...props.searchProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
