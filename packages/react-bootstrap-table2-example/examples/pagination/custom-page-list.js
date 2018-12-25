/* eslint react/prefer-stateless-function: 0 */
/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/href-no-hash: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
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

const pageListRenderer = ({
  pages,
  onPageChange
}) => {
  const pageWithoutIndication = pages.filter(p => typeof p.page !== 'string');
  return (
    <div>
      {
        pageWithoutIndication.map(p => (
          <button className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
        ))
      }
    </div>
  );
};

const options = {
  pageListRenderer
};

<BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
`;

const pageListRenderer = ({
  pages,
  onPageChange
}) => {
  const pageWithoutIndication = pages.filter(p => typeof p.page !== 'string');
  return (
    <div>
      {
        pageWithoutIndication.map(p => (
          <button className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
        ))
      }
    </div>
  );
};

const options = {
  pageListRenderer
};

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    <Code>{ sourceCode }</Code>
  </div>
);
