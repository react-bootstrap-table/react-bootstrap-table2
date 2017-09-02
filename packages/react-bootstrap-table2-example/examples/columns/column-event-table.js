/* eslint no-unused-vars: 0 */
/* eslint no-alert: 0 */
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
  events: {
    onClick: () => alert('Click on Product ID field')
  }
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default () => (
  <div>
    <h3>Try to Click on Product ID columns</h3>
    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    <pre className="prettyprint lang-js"><code className="language-javascript">{`
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  events: {
    onClick: () => alert('Click on Product ID field')
  }
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
    `}
    </code></pre>
  </div>
);
