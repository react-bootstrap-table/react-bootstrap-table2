/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

class OnetimeSortConfiguration extends React.Component {
  sortFunc = (a, b, order, dataField) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }

  render() {
    const sortOption = {
      // No need to configure sortFunc per column
      sortFunc: this.sortFunc,
      // No need to configure sortCaret per column
      sortCaret: (order, column) => {
        if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
        return null;
      }
    };

    return (
      <div>
        <button className="btn btn-default" onClick={ this.handleClick }>Change Data</button>
        <BootstrapTable keyField="id" data={ products } columns={ columns } sort={ sortOption } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
`;

export default class OnetimeSortConfiguration extends React.Component {
  sortFunc = (a, b, order, dataField) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }

  render() {
    const sortOption = {
      sortFunc: this.sortFunc,
      sortCaret: (order, column) => {
        if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<font color="red">Asc</font></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="red">Desc</font>/Asc</span>);
        return null;
      }
    };

    return (
      <div>
        <h3>Reverse Sorting Table</h3>
        <BootstrapTable keyField="id" data={ products } columns={ columns } sort={ sortOption } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
