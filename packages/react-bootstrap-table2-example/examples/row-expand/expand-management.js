/* eslint no-unused-vars: 0 */
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

class RowExpandManagment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: [0, 1] };
  }

  handleBtnClick = () => {
    if (!this.state.expanded.includes(2)) {
      this.setState(() => ({
        expanded: [...this.state.expanded, 2]
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded.filter(x => x !== 2)
      }));
    }
  }

  handleOnExpand = (row, isExpand, rowIndex, e) => {
    if (isExpand) {
      this.setState(() => ({
        expanded: [...this.state.expanded, row.id]
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded.filter(x => x !== row.id)
      }));
    }
  }

  render() {
    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      expanded: this.state.expanded,
      onExpand: this.handleOnExpand
    };
    return (
      <div>
        <button className="btn btn-success" onClick={ this.handleBtnClick }>Expand/Collapse 3rd row</button>
        <BootstrapTable keyField="id" data={ products } columns={ columns } expandRow={ expandRow } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
`;

export default class RowExpandManagment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: [0, 1] };
  }

  handleBtnClick = () => {
    if (!this.state.expanded.includes(2)) {
      this.setState(() => ({
        expanded: [...this.state.expanded, 2]
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded.filter(x => x !== 2)
      }));
    }
  }

  handleOnExpand = (row, isExpand, rowIndex, e) => {
    if (isExpand) {
      this.setState(() => ({
        expanded: [...this.state.expanded, row.id]
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded.filter(x => x !== row.id)
      }));
    }
  }

  render() {
    const expandRow = {
      renderer: row => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      expanded: this.state.expanded,
      onExpand: this.handleOnExpand
    };
    return (
      <div>
        <button className="btn btn-success" onClick={ this.handleBtnClick }>Expand/Collapse 3rd row</button>
        <BootstrapTable keyField="id" data={ products } columns={ columns } expandRow={ expandRow } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
