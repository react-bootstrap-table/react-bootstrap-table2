/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const { ExportCSVButton } = CSVExport;
const products1 = productsGenerator(15);
const products2 = productsGenerator(15);

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
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

const { ExportCSVButton } = CSVExport;
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

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

<ToolkitProvider
  keyField="id"
  data={ products1 }
  columns={ columns }
  exportCSV={ { onlyExportSelection: true, exportAll: true } }
>
  {
    props => (
      <div>
        <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
        <hr />
        <BootstrapTable
          { ...props.baseProps }
          selectRow={ selectRow }
          pagination={ paginationFactory() }
        />
      </div>
    )
  }
</ToolkitProvider>

<ToolkitProvider
  keyField="id"
  data={ products2 }
  columns={ columns }
  exportCSV={ { onlyExportSelection: true, exportAll: false } }
>
  {
    props => (
      <div>
        <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
        <hr />
        <BootstrapTable
          { ...props.baseProps }
          selectRow={ selectRow }
          pagination={ paginationFactory() }
        />
      </div>
    )
  }
</ToolkitProvider>
`;

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

export default () => (
  <div>
    <h3>Export all selected row</h3>
    <ToolkitProvider
      keyField="id"
      data={ products1 }
      columns={ columns }
      exportCSV={ { onlyExportSelection: true, exportAll: true } }
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable
              { ...props.baseProps }
              selectRow={ selectRow }
              pagination={ paginationFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>
    <h3>Export all selected rows in currect visible rows</h3>
    <ToolkitProvider
      keyField="id"
      data={ products2 }
      columns={ columns }
      exportCSV={ { onlyExportSelection: true, exportAll: false } }
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable
              { ...props.baseProps }
              selectRow={ selectRow }
              pagination={ paginationFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
