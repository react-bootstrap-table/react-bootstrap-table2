import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsQualityGenerator } from 'utils/common';

const products = productsQualityGenerator(6);

let qualityFilter;

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
    getFilter: (filter) => {
      // qualityFilter was assigned once the component has been mounted.
      qualityFilter = filter;
    }
  })
}];

const handleClick = () => {
  qualityFilter('0');
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

let qualityFilter;

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
    getFilter: (filter) => {
      // qualityFilter was assigned once the component has been mounted.
      qualityFilter = filter;
    }
  })
}];

const handleClick = () => {
  qualityFilter('0');
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
