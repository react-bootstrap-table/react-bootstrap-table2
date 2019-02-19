/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columnsdt = [{
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
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

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

const CustomToggleList = ({
  columns,
  onColumnToggle,
  toggles
}) => (
  <div className="btn-group btn-group-toggle btn-group-vertical" data-toggle="buttons">
    {
      columns
        .map(column => ({
          ...column,
          toggle: toggles[column.dataField]
        }))
        .map(column => (
          <button
            type="button"
            key={ column.dataField }
            className={ \`btn btn-warning \${column.toggle ? 'active' : ''}\` }
            data-toggle="button"
            aria-pressed={ column.toggle ? 'true' : 'false' }
            onClick={ () => onColumnToggle(column.dataField) }
          >
            { column.text }
          </button>
        ))
    }
  </div>
);

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columnsdt }
  columnToggle
>
  {
    props => (
      <div>
        <CustomToggleList { ...props.columnToggleProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>
`;

const CustomToggleList = ({
  columns,
  onColumnToggle,
  toggles
}) => (
  <div className="btn-group btn-group-toggle btn-group-vertical" data-toggle="buttons">
    {
      columns
        .map(column => ({
          ...column,
          toggle: toggles[column.dataField]
        }))
        .map(column => (
          <button
            type="button"
            key={ column.dataField }
            className={ `btn btn-warning ${column.toggle ? 'active' : ''}` }
            data-toggle="button"
            aria-pressed={ column.toggle ? 'true' : 'false' }
            onClick={ () => onColumnToggle(column.dataField) }
          >
            { column.text }
          </button>
        ))
    }
  </div>
);

export default () => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columnsdt }
      columnToggle
    >
      {
        props => (
          <div>
            <CustomToggleList { ...props.columnToggleProps } />
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
