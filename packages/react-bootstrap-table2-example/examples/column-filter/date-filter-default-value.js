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
  formatter: cell => cell.toString(),
  filter: dateFilter({
    defaultValue: { date: new Date(2018, 0, 1), comparator: Comparator.GT }
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
    defaultValue: { date: new Date(2018, 0, 1), comparator: Comparator.GT }
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
