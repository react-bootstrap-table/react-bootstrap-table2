/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { productsGenerator } from 'utils/common';

const ProductList = (props) => {
  const columns = [
    {
      dataField: 'id',
      text: 'Product ID'
    },
    {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({
        defaultValue: '6'
      })
    },
    {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter()
    }
  ];

  return (
    <div style={ { paddingTop: '20px' } }>
      <h1 className="h2">Products</h1>
      <BootstrapTable
        keyField="id"
        data={ props.products }
        columns={ columns }
        filter={ filterFactory() }
        pagination={ paginationFactory() }
      />
    </div>
  );
};

export default class DataContainer extends React.Component {
  state = {
    products: productsGenerator(60)
  };

  loadData = () => {
    this.setState({
      products: productsGenerator(14)
    });
  }

  render() {
    return (
      <div>
        <button
          onClick={ this.loadData }
          style={ {
            fontSize: '20px',
            position: 'absolute',
            left: '200px',
            top: '40px'
          } }
        >
          Load Data
        </button>
        <ProductList products={ this.state.products } />
      </div>
    );
  }
}
