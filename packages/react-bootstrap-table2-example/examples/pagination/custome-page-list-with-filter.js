/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsQualityGenerator } from 'utils/common';

const products = productsQualityGenerator(21);

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
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    defaultValue: 0
  })
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

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
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    defaultValue: 0
  })
}];

class Table extends React.Component {
  state = { products }

  loadData = () => {
    this.setState({ products: productsQualityGenerator(40, 7) });
  }

  render() {
    const options = {
      custom: true,
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      totalSize: this.state.products.length
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <button className="btn btn-default" onClick={ this.loadData }>Load Another Data</button>
        <PaginationListStandalone { ...paginationProps } />
        <div>
          <div>
            <BootstrapTable
              striped
              hover
              keyField="id"
              data={ this.state.products }
              columns={ columns }
              filter={ filterFactory() }
              { ...paginationTableProps }
            />
          </div>
        </div>
        <PaginationListStandalone { ...paginationProps } />
      </div>
    );

    return (
      <div>
        <h2>PaginationProvider will care the data size change. You dont do anything</h2>
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          { contentTable }
        </PaginationProvider>
      </div >
    );
  }
}
`;

export default class Table extends React.Component {
  state = { products }

  loadData = () => {
    this.setState({ products: productsQualityGenerator(40, 7) });
  }

  render() {
    const options = {
      custom: true,
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      totalSize: this.state.products.length
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <button className="btn btn-default" onClick={ this.loadData }>Load Another Data</button>
        <PaginationListStandalone { ...paginationProps } />
        <div>
          <div>
            <BootstrapTable
              striped
              hover
              keyField="id"
              data={ this.state.products }
              columns={ columns }
              filter={ filterFactory() }
              { ...paginationTableProps }
            />
          </div>
        </div>
        <PaginationListStandalone { ...paginationProps } />
      </div>
    );

    return (
      <div>
        <h2>PaginationProvider will care the data size change. You dont do anything</h2>
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          { contentTable }
        </PaginationProvider>
        <Code>{ sourceCode }</Code>
      </div >
    );
  }
}
