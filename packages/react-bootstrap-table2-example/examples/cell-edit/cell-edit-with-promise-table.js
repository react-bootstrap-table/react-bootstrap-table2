/* eslint no-unused-vars: 0 */
/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';

import { BootstrapTableful } from 'react-bootstrap-table2';
import Code from 'components/common/code-block';
import { productsGenerator, sleep } from 'utils/common';

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

const sourceCode = `\
class CellEditWithPromise extends Component {
  handleCellEditing = (rowId, dataField, newValue) => {
    return sleep(1000).then(() => {
      if (dataField === 'price' && (newValue < 2000 || isNaN(newValue))) {
        throw new Error('Product Price should bigger than $2000');
      }
    });
  }

  render() {
    const cellEdit = {
      mode: 'click',
      blurToSave: true,
      onUpdate: this.handleCellEditing
    };

    return (
      <div>
        <BootstrapTableful keyField="id" data={ products } columns={ columns } cellEdit={ cellEdit } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
`;

class CellEditWithPromise extends Component {
  handleCellEditing = (rowId, dataField, newValue) => {
    return sleep(1000).then(() => {
      if (dataField === 'price' && (newValue < 2000 || isNaN(newValue))) {
        throw new Error('Product Price should bigger than $2000');
      }
    });
  }

  render() {
    const cellEdit = {
      mode: 'click',
      blurToSave: true,
      onUpdate: this.handleCellEditing
    };

    return (
      <div>
        <BootstrapTableful keyField="id" data={ products } columns={ columns } cellEdit={ cellEdit } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}

export default CellEditWithPromise;

