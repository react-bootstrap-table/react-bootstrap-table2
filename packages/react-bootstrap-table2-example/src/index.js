/* eslint no-unused-vars: 0 */
/* eslint no-debugger: 0 */
/* eslint arrow-body-style: 0 */
import React from 'react';
import ReactDom from 'react-dom';

import { BootstrapTableful, createTable } from 'react-bootstrap-table2';

require('react-bootstrap-table2/style/react-bootstrap-table.scss');

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i += 1) {
    const id = startId + i;
    products.push({
      id,
      name: `Item name ${id}`,
      price: 2100 + i,
      nest: {
        address: 'Address 1',
        postcal: '0922-1234'
      }
    });
  }
}

addProducts(5);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  style: {
    backgroundColor: 'red'
  },
  classes: 'my-xxx'
}, {
  dataField: 'name',
  text: 'Product Name',
  headerTitle: true,
  formatter: (cell, row) =>
    (<h3>{ cell }::: ${ row.price }</h3>),
  validator: (newValue, row, column) => {
    const validationForm = {
      valid: true,
      message: null
    };
    validationForm.valid = false;
    validationForm.message = 'Invalid message';
    return validationForm;
  }
}, {
  dataField: 'price',
  text: 'Product Price',
  validator: (newValue, row, column) => {
    if (newValue < 2000) {
      return {
        valid: false,
        message: 'Price should bigger than 2000'
      };
    }
    return true;
  }
}, {
  dataField: 'nest.address',
  text: 'Address'
}, {
  dataField: 'nest.postcal',
  text: 'Postal',
  editable: true,
  validator: (newValue, row, column) => true
}];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const cellEdit = {
  mode: 'click',
  blurToSave: true,
  // beforeSaveCell: (oldValue, newValue, row, column) => {
  //   console.log('beforeSavecell');
  //   // console.log(oldValue);
  //   // console.log(newValue);
  //   // console.log(row);
  //   // console.log(column);
  // },
  // afterSaveCell: (oldValue, newValue, row, column) => {
  //   console.log('aftersavecell');
  //   // console.log(oldValue);
  //   // console.log(newValue);
  //   // console.log(row);
  //   // console.log(column);
  // }
  onUpdate: (rowId, dataField, newValue) => {
    return sleep(1000).then(() => {
      // return { forceUpdate: true };
      throw new Error('test is not successfully');
    });
  }
  // nonEditableRows: () => [1, 3, 7]
};


// let Table = withCellEdit({
//   mode: 'click',
//   blurToSave: true,
//   onEditing: (rowId, dataField, newValue) => {
//     return sleep(1000).then(() => {
//       // return { forceUpdate: true };
//       throw new Error('test is not successfully');
//     });
//   }
// })(BootstrapTable);
// Table = createTable(Table);

ReactDom.render(
  <BootstrapTableful keyField="id" data={ products } columns={ columns } cellEdit={ cellEdit } />,
  document.getElementById('example'));
