import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

let filterBy;

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    getFilterBy: (filterByFunc) => {
      filterBy = filterByFunc;
    }
  })
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const handleClick = () => {
  filterBy('0');
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

let filterBy;

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    getFilterBy: (filterByFunc) => {
      // filterBy was assigned to onFilter once the component has mount
      filterBy = filterByFunc;
    }
  })
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const handleClick = () => {
  filterBy('0');
};

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter columns by 0 </button>

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
  </div>
);
`;

export default () => (
  <div>
    <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter columns by 0 </button>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
