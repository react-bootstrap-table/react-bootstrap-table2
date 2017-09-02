import React from 'react';

import { BootstrapTable } from 'react-bootstrap-table2';
import Code from 'common/codeBlock';

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
<BootstrapTable keyField='id' data={ [] } columns={ columns } noDataIndication="Table is Empty" />

// Following is more customizable example

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
