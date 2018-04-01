import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

let filterBy;

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
    getFilterBy: (filterByFunc) => {
      filterBy = filterByFunc;
    }
  })
}];

const handleClick = () => {
  filterBy({
    number: 2103,
    comparator: Comparator.GT
  });
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';

let filterBy;

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
    getFilterBy: (filterByFunc) => {
      filterBy = filterByFunc;
    }
  })
}];

const handleClick = () => {
  filterBy({
    number: 2103,
    comparator: Comparator.GT
  });
};

<button className="btn btn-lg btn-primary" onClick={ handleClick }> filter all columns which is greater than 2103 </button>

export default () => (
  <div>
  <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter all columns which is greater than 2103 </button>

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
  </div>
);
`;

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter all columns which is greater than 2103 </button>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
