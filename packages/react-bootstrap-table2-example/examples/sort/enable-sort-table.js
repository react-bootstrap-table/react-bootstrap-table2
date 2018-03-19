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

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: products };
  }

  handleClick = () => {
    this.setState(() => {
      const newProducts = productsGenerator(21);
      return {
        data: newProducts
      };
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={ this.handleClick }>Change Data</button>
        <BootstrapTable keyField="id" data={ this.state.data } columns={ columns } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
