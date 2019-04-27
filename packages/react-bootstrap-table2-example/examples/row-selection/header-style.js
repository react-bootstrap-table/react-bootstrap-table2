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
  headerColumnStyle: {
    backgroundColor: 'blue'
  }
};

const sourceCode1 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = ...

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  headerColumnStyle: {
    backgroundColor: 'blue'
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
  headerColumnStyle: (status) => {
    if (status === 'checked') {
      return {
        backgroundColor: 'yellow'
      };
    } else if (status === 'indeterminate') {
      return {
        backgroundColor: 'pink'
      };
    } else if (status === 'unchecked') {
      return {
        backgroundColor: 'grey'
      };
    }
    return {};
  }
};

const sourceCode2 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = ...

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  headerColumnStyle: (status) => {
    if (status === 'checked') {
      return {
        backgroundColor: 'yellow'
      };
    } else if (status === 'indeterminate') {
      return {
        backgroundColor: 'pink'
      };
    } else if (status === 'unchecked') {
      return {
        backgroundColor: 'grey'
      };
    }
    return {};
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
