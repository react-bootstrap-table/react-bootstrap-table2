import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsQualityGenerator } from 'utils/common';

const products = productsQualityGenerator(6);

let filterBy;

const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    getFilterBy: (filterByFunc) => {
      // filterBy was assigned to onFilter once the component has mount
      filterBy = filterByFunc;
    }
  })
}];

const handleClick = () => {
  filterBy('0');
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

let filterBy;

const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    getFilterBy: (filterByFunc) => {
      // filterBy was assigned to onFilter once the component has mount
      filterBy = filterByFunc;
    }
  })
}];

const handleClick = () => {
  filterBy('0');
};

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }>{' filter columns by option "good" '}</button>

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
  </div>
);
`;

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }>{' filter columns by option "good" '}</button>

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
