import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsExpandRowsGenerator } from 'utils/common';

const products = productsExpandRowsGenerator();

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

const expandRow1 = {
  className: 'expanding-foo',
  renderer: row => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};

const expandRow2 = {
  className: (isExpanded, row, rowIndex) => {
    if (rowIndex > 2) return 'expanding-foo';
    return 'expanding-bar';
  },
  renderer: row => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};


const sourceCode1 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = // omit...

const expandRow = {
  className: 'expanding-foo',
  renderer: row => (
    <div>.....</div>
  )
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  expandRow={ expandRow }
/>
`;

const sourceCode2 = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = // omit...

const expandRow = {
  className: (isExpanded, row, rowIndex) => {
    if (rowIndex > 2) return 'expanding-foo';
    return 'expanding-bar';
  },
  renderer: row => (
    <div>...</div>
  )
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  expandRow={ expandRow }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      expandRow={ expandRow1 }
    />
    <Code>{ sourceCode1 }</Code>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      expandRow={ expandRow2 }
    />
    <Code>{ sourceCode2 }</Code>
  </div>
);
