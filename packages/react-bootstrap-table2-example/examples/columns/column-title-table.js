/* eslint no-unused-vars: 0 */
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
      price: 2100 + i
    });
  }
}

addProducts(5);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  title: true
}, {
  dataField: 'name',
  text: 'Product Name',
  title: (cell, row, colIndex) => `this is custom title for ${cell}`
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <pre className="prettyprint lang-js"><code className="language-javascript">{`
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  title: true
}, {
  dataField: 'name',
  text: 'Product Name',
  title: (cell, row, colIndex) => \`this is custom title for \${cell}\`
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
    `}
    </code></pre>
  </div>
);
