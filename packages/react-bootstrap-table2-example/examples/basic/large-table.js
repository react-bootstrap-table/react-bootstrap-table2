import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
// import cellEditFactory from 'react-bootstrap-table2-editor';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(2000);

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

// cellEdit={ cellEditFactory({
//   mode: 'click'
// }) }

// const expandRow = {
//   renderer: row => (
//     <div>
//       <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
//       <p>You can render anything here, also you can add additional data on every row object</p>
//       <p>expandRow.renderer callback will pass the origin row object to you</p>
//     </div>
//   )
// };

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  bgColor: 'red'
  // selected: [2],
  // hideSelectColumn: true
  // clickToEdit: true
};

/* eslint react/prefer-stateless-function: 0 */
export default class Table extends React.PureComponent {
  render() {
    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          selectRow={ selectRow }
        />
      </div>
    );
  }
}
