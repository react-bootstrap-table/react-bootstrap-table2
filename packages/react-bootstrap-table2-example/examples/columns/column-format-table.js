import React from 'react';

import BootstrapTable from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

function priceFormatter(cell, row) {
  if (row.onSale) {
    return (
      <span><strong style={ { color: 'red' } }>$ { cell } NTD(Sales!!)</strong></span>
    );
  }

  return (
    <span>$ { cell } NTD</span>
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
  formatter: priceFormatter
}];

const sourceCode = `\
function priceFormatter(cell, row) {
  if (row.onSale) {
    return (
      <span>
        <strong style={ { color: 'red' } }>$ { cell } NTD(Sales!!)</strong>
      </span>
    );
  }

  return (
    <span>$ { cell } NTD</span>
  );
}

const columns = [
// omit...
{
  dataField: 'price',
  text: 'Product Price',
  formatter: priceFormatter
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
