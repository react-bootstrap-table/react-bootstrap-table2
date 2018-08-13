/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { jobsGenerator1 } from 'utils/common';

const { SearchBar } = Search;
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
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;
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

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <h3>Try to Search Bob, Cat or Allen instead of 0, 1 or 2</h3>
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
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
      search
    >
      {
        props => (
          <div>
            <h3>Try to Search Bob, Cat or Allen instead of 0, 1 or 2</h3>
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
