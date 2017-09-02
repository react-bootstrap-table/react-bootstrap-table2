/* eslint no-console: 0 */
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
      rank: Math.random() < 0.5 ? 'down' : 'up'
    });
  }
}

addProducts(5);

function rankFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <i className={ formatExtraData[cell] } />
  );
}

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'rank',
  text: 'Rank',
  formatter: rankFormatter,
  formatExtraData: {
    up: 'glyphicon glyphicon-chevron-up',
    down: 'glyphicon glyphicon-chevron-down'
  }
}];

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      bordered={ false }
    />
    <pre className="prettyprint lang-js"><code className="language-javascript">{`
function rankFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <i className={ formatExtraData[cell] } />
  );
}

const columns = [
// omit...
{
  dataField: 'rank',
  text: 'Rank',
  formatter: rankFormatter,
  formatExtraData: {
    up: 'glyphicon glyphicon-chevron-up',
    down: 'glyphicon glyphicon-chevron-down'
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
