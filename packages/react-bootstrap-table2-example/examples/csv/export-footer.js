/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const { ExportCSVButton } = CSVExport;
const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  footer: 'Footer 1'
}, {
  dataField: 'name',
  text: 'Product Name',
  footer: '',
  footerFormatter: column => column.text
}, {
  dataField: 'price',
  text: 'Product Price',
  footer: columnData => columnData.reduce((acc, item) => acc + item, 0)
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

const { ExportCSVButton } = CSVExport;
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  footer: 'Footer 1'
}, {
  dataField: 'name',
  text: 'Product Name',
  footer: 'Footer 2'
}, {
  dataField: 'price',
  text: 'Product Price',
  footer: 'Footer 3'
}];

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  exportCSV={ {
    ignoreFooter: false
  } }
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
      exportCSV={ {
        ignoreFooter: false
      } }
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
