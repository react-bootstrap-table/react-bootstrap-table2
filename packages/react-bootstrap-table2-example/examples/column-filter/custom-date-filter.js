import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, Comparator } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { stockGenerator } from 'utils/common';

const stocks = stockGenerator(8);

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'inStockDate',
  text: 'InStock Date',
  filter: dateFilter({
    delay: 400,
    placeholder: 'custom placeholder',
    withoutEmptyComparatorOption: true,
    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
    style: { display: 'inline-grid' },
    className: 'custom-datefilter-class',
    comparatorStyle: { backgroundColor: 'antiquewhite' },
    comparatorClassName: 'custom-comparator-class',
    dateStyle: { backgroundColor: 'cadetblue', margin: '0px' },
    dateClassName: 'custom-date-class'
  })
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'inStockDate',
  text: 'InStock Date',
  filter: dateFilter({
    delay: 400,
    placeholder: 'custom placeholder',
    withoutEmptyComparatorOption: true,
    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
    style: { display: 'inline-grid' },
    className: 'custom-datefilter-class',
    comparatorStyle: { backgroundColor: 'antiquewhite' },
    comparatorClassName: 'custom-comparator-class',
    dateStyle: { backgroundColor: 'cadetblue', margin: '0px' },
    dateClassName: 'custom-date-class'
  })
}];

<BootstrapTable
  keyField="id"
  data={ stocks }
  columns={ columns }
  filter={ filterFactory() }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ stocks }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
