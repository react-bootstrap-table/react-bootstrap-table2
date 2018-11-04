/* eslint max-len: 0 */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsQualityGenerator } from 'utils/common';

const products = productsQualityGenerator(6);

const selectOptions = [
  { label: 0, value: 'good' },
  { label: 1, value: 'Bad' },
  { label: 2, value: 'unknown' }
];

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions.find(opt => opt.label === cell).value,
  filter: selectFilter({
    options: selectOptions
  })
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

const selectOptions = [
  { label: 0, value: 'good' },
  { label: 1, value: 'Bad' },
  { label: 2, value: 'unknown' }
];

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions.find(opt => opt.label === cell).value,
  filter: selectFilter({
    options: selectOptions
  })
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
`;

export default () => (
  <div>
    <h3><code>selectFilter.options</code> accept an Array and we keep that order when rendering the options</h3>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
