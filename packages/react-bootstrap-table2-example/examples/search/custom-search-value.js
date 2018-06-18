/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitContext, { Search } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { jobsGenerator1 } from 'utils/common';

const { SearchBar, searchFactory } = Search;
const products = jobsGenerator1(5);

const owners = ['Allen', 'Bob', 'Cat'];
const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

const columns = [{
  dataField: 'id',
  text: 'Job ID',
  searchable: false,
  hidden: true
}, {
  dataField: 'owner',
  text: 'Job Owner',
  formatter: (cell, row) => owners[cell],
  filterValue: (cell, row) => owners[cell] // we will search the value after filterValue called
}, {
  dataField: 'type',
  text: 'Job Type',
  formatter: (cell, row) => types[cell],
  filterValue: (cell, row) => types[cell] // we will search the value after filterValue called
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitContext, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar, searchFactory } = Search;
const owners = ['Allen', 'Bob', 'Cat'];
const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

const columns = [{
  dataField: 'id',
  text: 'Job ID',
  searchable: false,
  hidden: true
}, {
  dataField: 'owner',
  text: 'Job Owner',
  formatter: (cell, row) => owners[cell],
  filterValue: (cell, row) => owners[cell] // we will search the value after filterValue called
}, {
  dataField: 'type',
  text: 'Job Type',
  formatter: (cell, row) => types[cell],
  filterValue: (cell, row) => types[cell] // we will search the value after filterValue called
}];

<ToolkitContext.Provider>
  <ToolkitContext.Consumer>
    {
      props => (
        <div>
          <h3>Input something at below input field:</h3>
          <SearchBar { ...props.searchProps } />
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
              <h3>Try to Search Bob, Cat or Allen instead of 0, 1 or 2</h3>
              <SearchBar { ...props.searchProps } />
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
