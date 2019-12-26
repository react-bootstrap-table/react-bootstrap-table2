/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(40);
const { SearchBar } = Search;

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

class Table extends React.Component {
  state = { products }

  loadData = () => {
    this.setState({ products: productsGenerator(17) });
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
        <ToolkitProvider
          keyField="id"
          columns={ columns }
          data={ this.state.products }
          search
        >
          {
            toolkitprops => (
              <div>
                <SearchBar { ...toolkitprops.searchProps } />
                <BootstrapTable
                  striped
                  hover
                  { ...toolkitprops.baseProps }
                  { ...paginationTableProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
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
`;

export default class Table extends React.Component {
  state = { products }

  loadData = () => {
    this.setState({ products: productsGenerator(17) });
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
        <ToolkitProvider
          keyField="id"
          columns={ columns }
          data={ this.state.products }
          search
        >
          {
            toolkitprops => (
              <div>
                <SearchBar { ...toolkitprops.searchProps } />
                <BootstrapTable
                  striped
                  hover
                  { ...toolkitprops.baseProps }
                  { ...paginationTableProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
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
