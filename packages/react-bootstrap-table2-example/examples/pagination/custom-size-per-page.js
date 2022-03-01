/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
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
// ...

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => (
  <div className="btn-group" role="group">
    {
      options.map((option) => {
        const isSelect = currSizePerPage === \`$\{option.page}\`;
        return (
          <button
            key={ option.text }
            type="button"
            onClick={ () => onSizePerPageChange(option.page) }
            className={ \`btn $\{isSelect ? 'btn-secondary' : 'btn-warning'}\` }
          >
            { option.text }
          </button>
        );
      })
    }
  </div>
);

const options = {
  sizePerPageRenderer
};

<BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />s
`;

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => (
  <div className="btn-group" role="group">
    {
      options.map(option => (
        <button
          key={ option.text }
          type="button"
          onClick={ () => onSizePerPageChange(option.page) }
          className={ `btn ${currSizePerPage === `${option.page}` ? 'btn-secondary' : 'btn-warning'}` }
        >
          { option.text }
        </button>
      ))
    }
  </div>
);

const options = {
  sizePerPageRenderer
};

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    <Code>{ sourceCode }</Code>
  </div>
);
