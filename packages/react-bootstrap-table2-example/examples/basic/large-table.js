import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(3000);

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

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      selectRow={ { mode: 'checkbox', clickToSelect: true } }
      expandRow={ expandRow }
    />
  </div>
);
