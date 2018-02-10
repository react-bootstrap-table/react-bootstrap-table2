import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: numberFilter({
    options: [2100, 2103, 2105],
    delay: 600,
    placeholder: 'custom placeholder',
    withoutEmptyComparatorOption: true,
    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
    style: { display: 'inline-grid' },
    className: 'custom-numberfilter-class',
    comparatorStyle: { backgroundColor: 'antiquewhite' },
    comparatorClassName: 'custom-comparator-class',
    numberStyle: { backgroundColor: 'cadetblue', margin: '0px' },
    numberClassName: 'custom-number-class'
  })
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: numberFilter({
    options: [2100, 2103, 2105],
    delay: 600,
    placeholder: 'custom placeholder',
    withoutEmptyComparatorOption: true,
    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
    style: { display: 'inline-grid' },
    className: 'custom-numberfilter-class',
    comparatorStyle: { backgroundColor: 'antiquewhite' },
    comparatorClassName: 'custom-comparator-class',
    numberStyle: { backgroundColor: 'cadetblue', margin: '0px' },
    numberClassName: 'custom-number-class'
  })
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
