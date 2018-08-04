import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, Comparator } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { stockGenerator } from 'utils/common';

const stocks = stockGenerator(8);

let inStockDateFilter;

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
    getFilter: (filter) => {
      // inStockDateFilter was assigned once the component has been mounted.
      inStockDateFilter = filter;
    }
  })
}];

const handleClick = () => {
  inStockDateFilter({
    date: new Date(2018, 0, 1),
    comparator: Comparator.GT
  });
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, Comparator } from 'react-bootstrap-table2-filter';

let inStockDateFilter;

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
    getFilter: (filter) => {
      // inStockDateFilter was assigned once the component has been mounted.
      inStockDateFilter = filter;
    }
  })
}];

const handleClick = () => {
  inStockDateFilter({
    date: new Date(2018, 0, 1),
    comparator: Comparator.GT
  });
};

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter InStock Date columns which is greater than 2018.01.01 </button>

    <BootstrapTable keyField='id' data={ stocks } columns={ columns } filter={ filterFactory() } />
  </div>
);
`;

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter InStock Date columns which is greater than 2018.01.01 </button>
    <BootstrapTable
      keyField="id"
      data={ stocks }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
