/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitContext, { CSVExport } from 'react-bootstrap-table2-toolkit';
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
  text: 'Product Price'
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
          <h3>Input something at below input field:</h3>
          <SearchBar { ...props.searchProps } />
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
  </ToolkitContext.Consumer>
</ToolkitContext.Provider>
`;

export default () => (
  <div>
    <ToolkitContext.Provider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV
    >
      <ToolkitContext.Consumer>
        {
          props => (
            <div>
              <h3>Input something at below input field:</h3>
              <CSVExport { ...props.csvProps } />
              <hr />
              <BootstrapTable { ...props.baseProps } />
            </div>
          )
        }
      </ToolkitContext.Consumer>
    </ToolkitContext.Provider>
    <Code>{ sourceCode }</Code>
  </div>
);
