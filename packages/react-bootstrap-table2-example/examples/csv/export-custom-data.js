/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
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

const MyExportCSV = (props) => {
  const handleClick = () => {
    // passing my custom data
    props.onExport(products.filter(r => r.id > 2));
  };
  return (
    <div>
      <button className="btn btn-success" onClick={ handleClick }>Only export Product ID bigger than 2</button>
    </div>
  );
};

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  exportCSV
>
  {
    props => (
      <div>
        <BootstrapTable { ...props.baseProps } />
        <hr />
        <MyExportCSV { ...props.csvProps } />
      </div>
    )
  }
</ToolkitProvider>
`;

const MyExportCSV = (props) => {
  const handleClick = () => {
    // passing my custom data
    props.onExport(products.filter(r => r.id > 2));
  };
  return (
    <div>
      <button className="btn btn-success" onClick={ handleClick }>Only export Product ID bigger than 2</button>
    </div>
  );
};

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
            <BootstrapTable { ...props.baseProps } />
            <hr />
            <MyExportCSV { ...props.csvProps } />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
