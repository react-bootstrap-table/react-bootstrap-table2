/* eslint react/prop-types: 0 */
import React from 'react';

/* eslint no-unused-vars: 0 */
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const { ExportCSVButton } = CSVExport;
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
  csvFormatter: (cell, row, rowIndex) => `$ ${cell}NTD`
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
  text: 'Product Price',
  csvFormatter: (cell, row, rowIndex) => \`$ \${cell}NTD\`
}];

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  exportCSV
>
  {
    props => (
      <div>
        <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
        <hr />
        <BootstrapTable { ...props.baseProps } />
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
      exportCSV
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
