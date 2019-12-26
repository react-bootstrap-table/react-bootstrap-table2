import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { stockGenerator } from 'utils/common';

const products = stockGenerator(8);

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
