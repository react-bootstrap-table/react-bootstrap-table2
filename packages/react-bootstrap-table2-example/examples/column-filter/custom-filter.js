/* eslint no-return-assign: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, customFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

class PriceFilter extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.getValue = this.getValue.bind(this);
  }
  getValue() {
    return this.input.value;
  }
  filter() {
    this.props.onFilter(this.getValue());
  }
  render() {
    return [
      <input
        key="input"
        ref={ node => this.input = node }
        type="text"
        placeholder="Input price"
      />,
      <button
        key="submit"
        className="btn btn-warning"
        onClick={ this.filter }
      >
        { `Find ${this.props.column.text}` }
      </button>
    ];
  }
}

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
  filter: customFilter(),
  filterRenderer: (onFilter, column) =>
    <PriceFilter onFilter={ onFilter } column={ column } />
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, customFilter } from 'react-bootstrap-table2-filter';

class PriceFilter extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.getValue = this.getValue.bind(this);
  }
  getValue() {
    return this.input.value;
  }
  filter() {
    this.props.onFilter(this.getValue());
  }
  render() {
    return [
      <input
        key="input"
        ref={ node => this.input = node }
        type="text"
        placeholder="Input price"
      />,
      <button
        key="submit"
        className="btn btn-warning"
        onClick={ this.filter }
      >
        { \`Filter $\{this.props.column.text}\` }
      </button>
    ];
  }
}

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
  filter: customFilter(),
  filterRenderer: (onFilter, column) =>
    <PriceFilter onFilter={ onFilter } column={ column } />
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
