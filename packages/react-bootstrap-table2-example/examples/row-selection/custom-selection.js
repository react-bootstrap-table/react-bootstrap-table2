/* eslint react/prop-types: 0 */
/* eslint no-param-reassign: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
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

const selectRow1 = {
  mode: 'radio',
  clickToSelect: true,
  selectionHeaderRenderer: () => 'X',
  selectionRenderer: ({ mode, ...rest }) => (
    <input type={ mode } { ...rest } />
  )
};

const selectRow2 = {
  mode: 'checkbox',
  clickToSelect: true,
  selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
    <input
      type="checkbox"
      ref={ (input) => {
        if (input) input.indeterminate = indeterminate;
      } }
      { ...rest }
    />
  ),
  selectionRenderer: ({ mode, ...rest }) => (
    <input type={ mode } { ...rest } />
  )
};

const sourceCode1 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = ....;

const selectRow = {
  mode: 'radio',
  clickToSelect: true,
  selectionHeaderRenderer: () => 'X',
  selectionRenderer: ({ mode, ...rest }) => (
    <input type={ mode } { ...rest } />
  )
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRow }
/>
`;

const sourceCode2 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = ....;

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
    <input
      type="checkbox"
      ref={ (input) => {
        if (input) input.indeterminate = indeterminate;
      } }
      { ...rest }
    />
  ),
  selectionRenderer: ({ mode, ...rest }) => (
    <input type={ mode } { ...rest } />
  )
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
