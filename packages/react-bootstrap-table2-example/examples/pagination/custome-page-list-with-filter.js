/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(21);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  filter: textFilter({})
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  filter: textFilter({})
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } />
`;

export default class Table extends React.Component {
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
      totalSize: products.length
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <PaginationListStandalone { ...paginationProps } />
        <div>
          <div>
            <BootstrapTable
              striped
              hover
              keyField="id"
              data={ products }
              columns={ columns }
              filter={ filterFactory() }
              cellEdit={ cellEditFactory() }
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
