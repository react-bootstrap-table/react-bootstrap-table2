/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(2);

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
  clickToSelect: true,
  selectColumnStyle: {
    backgroundColor: 'grey'
  }
};

const sourceCode1 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = ...

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  selectColumnStyle: {
    backgroundColor: 'grey'
  }
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRow }
/>
`;

const selectRow2 = {
  mode: 'checkbox',
  clickToSelect: true,
  selectColumnStyle: ({
    checked,
    disabled,
    rowIndex,
    rowKey
  }) => {
    if (checked) {
      return {
        backgroundColor: 'yellow'
      };
    }
    return {
      backgroundColor: 'pink'
    };
  }
};

const sourceCode2 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = ...

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  selectColumnStyle: ({
    checked,
    disabled,
    rowIndex,
    rowKey
  }) => {
    if (checked) {
      return {
        backgroundColor: 'yellow'
      };
    }
    return {
      backgroundColor: 'pink'
    };
  }
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRow }
/>
`;

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow1 } />
    <Code>{ sourceCode1 }</Code>
    <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow2 } />
    <Code>{ sourceCode2 }</Code>
  </div>
);
