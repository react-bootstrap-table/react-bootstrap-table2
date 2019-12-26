/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

class SortManagement extends React.Component {
  state = {
    field: null,
    order: null
  }

  handleSort = (field, order) => {
    this.setState({
      field,
      order
    });
  }

  handleSortById = () => {
    this.setState({
      field: 'id',
      order: 'desc'
    });
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      onSort: this.handleSort
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      onSort: this.handleSort
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];
    return (
      <div>
        <button className="btn btn-danger" onClick={ this.handleSortById }>Sort By ID</button>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          sort={ {
            dataField: this.state.field,
            order: this.state.order
          } }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
`;

export default class SortManagement extends React.Component {
  state = {
    field: null,
    order: null
  }

  handleSort = (field, order) => {
    this.setState({
      field,
      order
    });
  }

  handleSortById = () => {
    this.setState({
      field: 'id',
      order: 'desc'
    });
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      onSort: this.handleSort
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      onSort: this.handleSort
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];
    return (
      <div>
        <button className="btn btn-danger" onClick={ this.handleSortById }>Sort By ID</button>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          sort={ {
            dataField: this.state.field,
            order: this.state.order
          } }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
