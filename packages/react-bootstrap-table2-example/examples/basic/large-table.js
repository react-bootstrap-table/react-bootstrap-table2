import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(5000);

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

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      selectRow={ { mode: 'checkbox' } }
      cellEdit={ cellEditFactory({
        mode: 'click'
      }) }
    />
  </div>
);
