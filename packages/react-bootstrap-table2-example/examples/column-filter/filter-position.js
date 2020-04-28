import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const sourceCode1 = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  filter={ filterFactory() }
  filterPosition="top"
/>
`;

const sourceCode2 = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  filter={ filterFactory() }
  filterPosition="bottom"
/>
`;

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

const expandRow = {
  renderer: row => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  ),
  showExpandColumn: true,
  expandColumnPosition: 'right'
};

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
      filterPosition="top"
      expandRow={ expandRow }
      selectRow={ selectRow }
    />
    <Code>{ sourceCode1 }</Code>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
      filterPosition="bottom"
      expandRow={ expandRow }
      selectRow={ selectRow }
    />
    <Code>{ sourceCode2 }</Code>
  </div>
);
