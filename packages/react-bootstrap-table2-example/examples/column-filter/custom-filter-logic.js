/* eslint eqeqeq: 0 */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

class Table extends React.Component {
  filterByPrice = (filterVal, data) => {
    if (filterVal) {
      return data.filter(product => product.price == filterVal);
    }
    return data;
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        onFilter: this.filterByPrice
      })
    }];

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          filter={ filterFactory() }
        />
      </div>
    );
  }
}
`;

export default class Table extends React.Component {
  filterByPrice = (filterVal, data) => {
    if (filterVal) {
      return data.filter(product => product.price == filterVal);
    }
    return data;
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        onFilter: this.filterByPrice
      })
    }];

    return (
      <div>
        <h2>Implement a eq price filter</h2>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          filter={ filterFactory() }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
