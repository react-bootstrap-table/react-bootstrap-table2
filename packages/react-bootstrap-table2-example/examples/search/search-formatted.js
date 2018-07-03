/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitContext, { Search } from 'react-bootstrap-table2-toolkit';
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
  text: 'Product Price',
  formatter: cell => `USD ${cell}`
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitContext, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar, searchFactory } = Search;
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  formatter: cell => \`USD \${cell}\`  // we will search the data after formatted
}];

<ToolkitContext.Provider
  keyField="id"
  data={ products }
  columns={ columns }
>
  <ToolkitContext.Consumer>
    {
      props => (
        <div>
          <h3>Try to Search USD at below input field:</h3>
          <SearchBar { ...props.searchProps } />
          <hr />
          <BootstrapTable
            { ...props.baseProps }
            search={ searchFactory({
              ...props.searchProps,
              searchFormatted: true
            }) }
          />
        </div>
      )
    }
  </ToolkitContext.Consumer>
</ToolkitContext.Provider>
`;

export default () => (
  <div>
    <ToolkitContext.Provider
      keyField="id"
      data={ products }
      columns={ columns }
    >
      <ToolkitContext.Consumer>
        {
          props => (
            <div>
              <h3>Try to Search USD at below input field:</h3>
              <SearchBar { ...props.searchProps } />
              <hr />
              <BootstrapTable
                { ...props.baseProps }
                search={ searchFactory({
                  ...props.searchProps,
                  searchFormatted: true
                }) }
              />
            </div>
          )
        }
      </ToolkitContext.Consumer>
    </ToolkitContext.Provider>
    <Code>{ sourceCode }</Code>
  </div>
);
