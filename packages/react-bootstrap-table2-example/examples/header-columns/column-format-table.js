/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

function priceFormatter(column, colIndex) {
  return (
    <h5><strong>$$ { column.text } $$</strong></h5>
  );
}

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  headerFormatter: priceFormatter
}];

const sourceCode = `\
function priceFormatter(column, colIndex) {
  return (
    <h5><strong>$$ { column.text } $$</strong></h5>
  );
}

const columns = [
// omit...
{
  dataField: 'price',
  text: 'Product Price',
  headerFormatter: priceFormatter
}];

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
