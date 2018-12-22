/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(87);

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const options = {
  custom: true,
  totalSize: products.length
};

class FullyCustomPagination extends React.Component {
  handleNextPage = ({
    page,
    onPageChange
  }) => () => {
    onPageChange(page + 1);
  }

  handlePrevPage = ({
    page,
    onPageChange
  }) => () => {
    onPageChange(page - 1);
  }

  handleSizePerPage = ({
    page,
    onSizePerPageChange
  }, newSizePerPage) => {
    onSizePerPageChange(newSizePerPage, page);
  }

  render() {
    return (
      <div>
        <PaginationProvider
          pagination={ paginationFactory(options) }
        >
          {
            ({
              paginationProps,
              paginationTableProps
            }) => (
              <div>
                <div>
                  <p>Current Page: { paginationProps.page }</p>
                  <p>Current SizePerPage: { paginationProps.sizePerPage }</p>
                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-primary" onClick={ this.handleNextPage(paginationProps) }>Next Page</button>
                  <button className="btn btn-success" onClick={ this.handlePrevPage(paginationProps) }>Prev Page</button>
                  <button className="btn btn-danger" onClick={ () => this.handleSizePerPage(paginationProps, 10) }>Size Per Page: 10</button>
                  <button className="btn btn-warning" onClick={ () => this.handleSizePerPage(paginationProps, 25) }>Size Per Page: 25</button>
                </div>
                <BootstrapTable
                  keyField="id"
                  data={ products }
                  columns={ columns }
                  { ...paginationTableProps }
                />
              </div>
            )
          }
        </PaginationProvider>
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
`;

const options = {
  custom: true,
  totalSize: products.length
};

export default class FullyCustomPagination extends React.Component {
  handleNextPage = ({
    page,
    onPageChange
  }) => () => {
    onPageChange(page + 1);
  }

  handlePrevPage = ({
    page,
    onPageChange
  }) => () => {
    onPageChange(page - 1);
  }

  handleSizePerPage = ({
    page,
    onSizePerPageChange
  }, newSizePerPage) => {
    onSizePerPageChange(newSizePerPage, page);
  }

  render() {
    return (
      <div>
        <PaginationProvider
          pagination={ paginationFactory(options) }
        >
          {
            ({
              paginationProps,
              paginationTableProps
            }) => (
              <div>
                <div>
                  <p>Current Page: { paginationProps.page }</p>
                  <p>Current SizePerPage: { paginationProps.sizePerPage }</p>
                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-primary" onClick={ this.handleNextPage(paginationProps) }>Next Page</button>
                  <button className="btn btn-success" onClick={ this.handlePrevPage(paginationProps) }>Prev Page</button>
                  <button className="btn btn-danger" onClick={ () => this.handleSizePerPage(paginationProps, 10) }>Size Per Page: 10</button>
                  <button className="btn btn-warning" onClick={ () => this.handleSizePerPage(paginationProps, 25) }>Size Per Page: 25</button>
                </div>
                <BootstrapTable
                  keyField="id"
                  data={ products }
                  columns={ columns }
                  { ...paginationTableProps }
                />
              </div>
            )
          }
        </PaginationProvider>
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
