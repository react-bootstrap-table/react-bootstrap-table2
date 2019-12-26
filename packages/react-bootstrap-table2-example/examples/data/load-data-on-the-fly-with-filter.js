/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
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
      filter: textFilter()
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
      />
    </div>
  );
};

export default class DataContainer extends React.Component {
  state = {
    products: []
  };

  loadData = () => {
    this.setState({
      products: productsGenerator()
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
