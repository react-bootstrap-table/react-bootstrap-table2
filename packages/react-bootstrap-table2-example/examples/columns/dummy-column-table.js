/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';


const products = [
  { id: 12, name: 'Item 12', price: 12.5, inStock: false },
  { id: 13, name: 'Item 13', price: 13.5, inStock: true },
  { id: 14, name: 'Item 14', price: 14.5, inStock: true }
];

const columns = [
  {
    dataField: 'id',
    text: 'Product ID'
  },
  {
    dataField: 'name',
    text: 'Product Name'
  },
  {
    dataField: 'price',
    text: 'Product Price'
  },
  {
    dataField: 'inStock',
    text: 'In Stock',
    formatter: (cellContent, row) => (
      <div className="checkbox disabled">
        <label>
          <input type="checkbox" checked={ row.inStock } disabled />
        </label>
      </div>
    )
  },
  {
    dataField: 'df1',
    isDummyField: true,
    text: 'Action 1',
    formatter: (cellContent, row) => {
      if (row.inStock) {
        return (
          <h5>
            <span className="label label-success"> Available</span>
          </h5>
        );
      }
      return (
        <h5>
          <span className="label label-danger"> Backordered</span>
        </h5>
      );
    }
  },
  {
    dataField: 'df2',
    isDummyField: true,
    text: 'Action 2',
    formatter: (cellContent, row) => {
      if (row.inStock) {
        return (
          <h5>
            <span className="label label-success"> Available</span>
          </h5>
        );
      }
      return (
        <h5>
          <span className="label label-danger"> Backordered</span>
        </h5>
      );
    }
  }
];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
  {
    dataField: 'id',
    text: 'Product ID'
  },
  {
    dataField: 'name',
    text: 'Product Name'
  },
  {
    dataField: 'price',
    text: 'Product Price'
  },
  {
    dataField: 'inStock',
    text: 'In Stock',
    formatter: (cellContent, row) => (
      <div className="checkbox disabled">
        <label>
          <input type="checkbox" checked={ row.inStock } disabled />
        </label>
      </div>
    )
  },
  {
    dataField: 'df1',
    isDummyField: true,
    text: 'Action 1',
    formatter: (cellContent, row) => {
      if (row.inStock) {
        return (
          <h5>
            <span className="label label-success"> Available</span>
          </h5>
        );
      }
      return (
        <h5>
          <span className="label label-danger"> Backordered</span>
        </h5>
      );
    }
  },
  {
    dataField: 'df2',
    isDummyField: true,
    text: 'Action 2',
    formatter: (cellContent, row) => {
      if (row.inStock) {
        return (
          <h5>
            <span className="label label-success"> Available</span>
          </h5>
        );
      }
      return (
        <h5>
          <span className="label label-danger"> Backordered</span>
        </h5>
      );
    }
  }
];

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products };
  }

  toggleInStock = () => {
    let newProducts = [...this.state.products];
    newProducts = newProducts.map((d) => {
      if (d.id === 13) {
        return {
          ...d,
          inStock: !d.inStock
        };
      }
      return d;
    });
    this.setState(curr => ({ ...curr, products: newProducts }));
  };

  render() {
    return (
      <div>
        <h1 className="h2">Products</h1>
        <BootstrapTable
          keyField="id"
          data={ this.state.products }
          columns={ columns }
        />
        <button onClick={ this.toggleInStock } className="btn btn-primary">
          Toggle item 13 stock status
        </button>
      </div>
    );
  }
}
`;

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products };
  }

  toggleInStock = () => {
    let newProducts = [...this.state.products];
    newProducts = newProducts.map((d) => {
      if (d.id === 13) {
        return {
          ...d,
          inStock: !d.inStock
        };
      }
      return d;
    });
    this.setState(curr => ({ ...curr, products: newProducts }));
  };

  render() {
    return (
      <div>
        <h3>Action 1 and Action 2 are dummy column</h3>
        <button onClick={ this.toggleInStock } className="btn btn-primary">
          Toggle item 13 stock status
        </button>
        <BootstrapTable
          keyField="id"
          data={ this.state.products }
          columns={ columns }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}

export default ProductList;
