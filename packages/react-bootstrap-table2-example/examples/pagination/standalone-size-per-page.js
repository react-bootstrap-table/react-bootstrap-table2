/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
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
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

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

<PaginationProvider
  pagination={ paginationFactory(options) }
>
  {
    ({
      paginationProps,
      paginationTableProps
    }) => (
      <div>
        <SizePerPageDropdownStandalone
          { ...paginationProps }
        />
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
`;

const options = {
  custom: true,
  totalSize: products.length
};
// const pagination = paginationFactory(options);

export default class StandaloneSizePerPage extends React.Component {
  render() {
    return (
      <div>
        <PaginationProvider
          bootstrap4
          pagination={ paginationFactory(options) }
        >
          {
            ({
              paginationProps,
              paginationTableProps
            }) => (
              <div>
                <SizePerPageDropdownStandalone
                  { ...paginationProps }
                  btnContextual="btn btn-warning"
                />
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
