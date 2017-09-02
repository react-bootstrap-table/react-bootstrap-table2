import React from 'react';

import { BootstrapTable } from 'react-bootstrap-table2';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i += 1) {
    const id = startId + i;
    products.push({
      id,
      name: `Item name ${id}`,
      price: 2100 + i,
      onSale: Math.random() >= 0.5
    });
  }
}

addProducts(5);

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

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    <pre className="prettyprint lang-js"><code className="language-javascript">{`
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
    `}
    </code></pre>
  </div>
);
