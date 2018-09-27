import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

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

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  clickToExpand: true
};

const expandRow = {
  showExpandColumn: true,
  renderer: row => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

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

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  clickToExpand: true
};

const expandRow = {
  showExpandColumn: true,
  renderer: row => (
    <div>
      <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRow }
  expandRow={ expandRow }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
      expandRow={ expandRow }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
