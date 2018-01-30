import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(6);

const selectOptions = {
  '03': '03',
  '04': '04',
  '01': '01'
};

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: selectFilter({
    options: selectOptions,
    comparator: Comparator.LIKE // default is Comparator.EQ
  })
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

const selectOptions = {
  '03': '03',
  '04': '04',
  '01': '01'
};

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: selectFilter({
    options: selectOptions,
    comparator: Comparator.LIKE // default is Comparator.EQ
  })
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
`;

export default () => (
  <div>
    <h3>Select Filter with LIKE Comparator</h3>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
