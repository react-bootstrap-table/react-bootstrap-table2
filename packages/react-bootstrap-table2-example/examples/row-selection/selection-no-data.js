/* eslint no-unused-vars: 0 */
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

const selectRow1 = {
  mode: 'checkbox',
  clickToSelect: true
};

const sourceCode1 = `\
import BootstrapTable from 'react-bootstrap-table-next';

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

<BootstrapTable
  keyField='id'
  data={ [] }
  columns={ columns }
  selectRow={ selectRow }
  noDataIndication={ 'no results found' }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ [] }
      columns={ columns }
      selectRow={ selectRow1 }
      noDataIndication={ 'no results found' }
    />
    <Code>{ sourceCode1 }</Code>
  </div>
);
