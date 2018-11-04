/* eslint no-alert: 0 */
/* eslint consistent-return: 0 */
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

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

class AdvSelectionManagment extends React.Component {
  handleOnSelect = (row, isSelect) => {
    if (isSelect && row.id < 3) {
      alert('Oops, You can not select Product ID which less than 3');
      return false; // return false to deny current select action
    }
    return true; // return true or dont return to approve current select action
  }

  handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      return rows.filter(r => r.id >= 3).map(r => r.id);
    }
  }

  render() {
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll
    };
    return (
      <div>
        <h3>You can not select Product ID less than 3</h3>
        <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
`;

export default class AdvSelectionManagment extends React.Component {
  handleOnSelect = (row, isSelect) => {
    if (isSelect && row.id < 3) {
      alert('Oops, You can not select Product ID which less than 3');
      return false; // return false to deny current select action
    }
    return true; // return true or dont return to approve current select action
  }

  handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      return rows.filter(r => r.id >= 3).map(r => r.id);
    }
  }

  render() {
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll
    };
    return (
      <div>
        <h3>You can not select Product ID less than 3</h3>
        <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
