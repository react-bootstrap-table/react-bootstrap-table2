/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
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
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';

const { ToggleList } = ColumnToggle;
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
  columnToggle
>
  {
    props => (
      <div>
        <ToggleList
          contextual="success"
          className="list-custom-class"
          btnClassName="list-btn-custom-class"
          { ...props.columnToggleProps }
        />
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
      columnToggle
    >
      {
        props => (
          <div>
            <ToggleList
              contextual="success"
              className="list-custom-class"
              btnClassName="list-btn-custom-class"
              { ...props.columnToggleProps }
            />
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
