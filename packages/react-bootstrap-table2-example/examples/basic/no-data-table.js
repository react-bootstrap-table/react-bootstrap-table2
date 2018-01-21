import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';

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
// omit...

<BootstrapTable keyField='id' data={ [] } columns={ columns } noDataIndication="Table is Empty" />

// Following is a more flexible example

function indication() {
  // return something here
}

<BootstrapTable keyField='id' data={ [] } columns={ columns } noDataIndication={ indication } />
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ [] } columns={ columns } noDataIndication="Table is Empty" />
    <Code>{ sourceCode }</Code>
  </div>
);
