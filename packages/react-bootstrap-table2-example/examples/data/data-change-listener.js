/* eslint react/no-multi-comp: 0 */
/* eslint max-classes-per-file: "off" */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const sourceCode1 = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

class Case1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rowCount: products.length };
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  }

  render() {
    return (
      <div>
        <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
        <BootstrapTable
          onDataSizeChange={ this.handleDataChange }
          keyField="id"
          data={ products }
          columns={ columns }
          filter={ filterFactory() }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
`;

const sourceCode2 = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Case2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rowCount: products.length };
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  }

  render() {
    return (
      <div>
        <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
        <BootstrapTable
          onDataSizeChange={ this.handleDataChange }
          keyField="id"
          data={ products }
          columns={ columns }
          filter={ filterFactory() }
          pagination={ paginationFactory() }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
`;

const products1 = productsGenerator(8);
class WithoutPaginationCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rowCount: products1.length };
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  }

  render() {
    return (
      <div>
        <h3>Without Pagination Case</h3>
        <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
        <BootstrapTable
          onDataSizeChange={ this.handleDataChange }
          keyField="id"
          data={ products1 }
          columns={ columns }
          filter={ filterFactory() }
        />
        <Code>{ sourceCode2 }</Code>
      </div>
    );
  }
}

const products2 = productsGenerator(88);
class WithPaginationCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rowCount: products2.length };
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  }

  render() {
    return (
      <div>
        <h3>Without Pagination Case</h3>
        <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
        <BootstrapTable
          onDataSizeChange={ this.handleDataChange }
          keyField="id"
          data={ products2 }
          columns={ columns }
          filter={ filterFactory() }
          pagination={ paginationFactory() }
        />
        <Code>{ sourceCode1 }</Code>
      </div>
    );
  }
}

export default () => (
  <div>
    <WithoutPaginationCase />
    <WithPaginationCase />
  </div>
);

