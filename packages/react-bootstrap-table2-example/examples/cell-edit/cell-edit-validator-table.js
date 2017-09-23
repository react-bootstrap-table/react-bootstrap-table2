import React from 'react';
/* eslint no-unused-vars: 0 */
import { BootstrapTableful } from 'react-bootstrap-table2';
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
  text: 'Product Price',
  validator: (newValue, row, column) => {
    if (isNaN(newValue)) {
      return {
        valid: false,
        message: 'Price should be numeric'
      };
    }
    if (newValue < 2000) {
      return {
        valid: false,
        message: 'Price should bigger than 2000'
      };
    }
    return true;
  }
}];

const sourceCode = `\
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price',
  validator: (newValue, row, column) => {
    if (isNaN(newValue)) {
      return {
        valid: false,
        message: 'Price should be numeric'
      };
    }
    if (newValue < 2000) {
      return {
        valid: false,
        message: 'Price should bigger than 2000'
      };
    }
    return true;
  }
}];

const cellEdit = {
  mode: 'click',
  blurToSave: true
};

<BootstrapTableful
  keyField='id'
  data={ products }
  columns={ columns }
  cellEdit={ cellEdit }
/>
`;

const cellEdit = {
  mode: 'click',
  blurToSave: true
};
export default () => (
  <div>
    <h3>Product Price should bigger than $2000</h3>
    <BootstrapTableful keyField="id" data={ products } columns={ columns } cellEdit={ cellEdit } />
    <Code>{ sourceCode }</Code>
  </div>
);
