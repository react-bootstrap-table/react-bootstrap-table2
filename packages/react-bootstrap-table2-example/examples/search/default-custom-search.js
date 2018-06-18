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

<ToolkitContext.Provider>
  <ToolkitContext.Consumer>
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
            keyField="id"
            data={ products }
            columns={ columns }
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
    <ToolkitContext.Provider>
      <ToolkitContext.Consumer>
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
                keyField="id"
                data={ products }
                columns={ columns }
                search={ searchFactory({
                  ...props.searchProps
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
