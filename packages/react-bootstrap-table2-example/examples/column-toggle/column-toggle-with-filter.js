/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const { ToggleList } = ColumnToggle;
const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true,
  filter: textFilter()
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';

const { ToggleList } = ColumnToggle;
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true,
  filter: textFilter()
}];

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  columnToggle
>
  {
    props => (
      <div>
        <ToggleList { ...props.columnToggleProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
          filter={ filterFactory() }
        />
      </div>
    )
  }
</ToolkitProvider>
`;

export default () => (
  <div>
    <h3>Table will keep the filter/sort state when column toggle</h3>
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      columnToggle
    >
      {
        props => (
          <div>
            <ToggleList { ...props.columnToggleProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
              filter={ filterFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
