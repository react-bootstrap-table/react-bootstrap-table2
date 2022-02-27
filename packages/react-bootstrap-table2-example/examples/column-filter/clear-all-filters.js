import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { stockGenerator } from 'utils/common';

const products = stockGenerator(8);

const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

let nameFilter;
let priceFilter;
let qualityFilter;
let stockDateFilter;

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    getFilter: (filter) => {
      nameFilter = filter;
    },
    onFilter: filterVal => console.log(`Filter product name ${filterVal}`) // eslint-disable-line no-console
  })
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    getFilter: (filter) => {
      qualityFilter = filter;
    },
    onFilter: filterVal => console.log(`Filter quality ${filterVal}`) // eslint-disable-line no-console
  })
}, {
  dataField: 'price',
  text: 'Price',
  filter: textFilter({
    getFilter: (filter) => {
      priceFilter = filter;
    },
    onFilter: filterVal => console.log(`Filter Price: ${filterVal}`) // eslint-disable-line no-console
  })
}, {
  dataField: 'inStockDate',
  text: 'InStock Date',
  formatter: cell => cell.toString(),
  filter: dateFilter({
    getFilter: (filter) => {
      stockDateFilter = filter;
    },
    onFilter: filterVal => console.log(`Filter date: ${filterVal}`) // eslint-disable-line no-console
  })
}];

const handleClick = () => {
  nameFilter('');
  priceFilter('');
  qualityFilter('');
  stockDateFilter();
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';

let nameFilter;
let priceFilter;
let stockDateFilter;

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    getFilter: (filter) => {
      nameFilter = filter;
    }
  })
}, {
  dataField: 'price',
  text: 'Price',
  filter: textFilter({
    getFilter: (filter) => {
      priceFilter = filter;
    }
  })
}, {
  dataField: 'inStockDate',
  text: 'InStock Date',
  formatter: cell => cell.toString(),
  filter: dateFilter({
    getFilter: (filter) => {
      stockDateFilter = filter;
    }
  })
}];

const handleClick = () => {
  nameFilter('');
  priceFilter('');
  stockDateFilter();
};

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }> Clear all filters </button>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
  </div>
);
`;

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }> Clear all filters </button>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
