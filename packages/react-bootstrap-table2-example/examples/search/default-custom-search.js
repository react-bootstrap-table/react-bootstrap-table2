/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const { SearchBar, searchFactory } = Search;
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

const { SearchBar, searchFactory } = Search;
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

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
>
  {
    props => (
      <div>
        <h3>Input something at below input field:</h3>
        <SearchBar
          { ...props.searchProps }
          className="custome-search-field"
          style={ { color: 'white' } }
          delay={ 1000 }
          placeholder="Search Something!!!"
        />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
          search={ searchFactory({
            ...props.searchProps
          }) }
        />
      </div>
    )
  }
</ToolkitProvider>
`;

export default () => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
    >
      {
        props => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar
              { ...props.searchProps }
              className="custome-search-field"
              style={ { color: 'white' } }
              delay={ 1000 }
              placeholder="Search Something!!!"
            />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
              search={ searchFactory({
                ...props.searchProps
              }) }
            />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
