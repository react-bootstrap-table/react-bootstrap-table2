/* eslint no-return-assign: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, customFilter, Comparator, FILTER_TYPES } from 'react-bootstrap-table2-filter';
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
    this.onChange = this.onChange.bind(this);
    this.state = { value: 2100 };
  }
  onChange(e) {
    this.setState({ value: e.target.value });
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }
  filter() {
    this.props.onFilter({
      number: this.getValue(),
      comparator: this.select.value
    });
  }
  render() {
    return [
      <input
        key="range"
        ref={ node => this.range = node }
        type="range"
        min="2100"
        max="2110"
        onChange={ this.onChange }
      />,
      <p
        key="show"
        ref={ node => this.showValue = node }
        style={ { textAlign: 'center' } }
      >
        { this.state.value }
      </p>,
      <select
        key="select"
        ref={ node => this.select = node }
        className="form-control"
      >
        <option value={ Comparator.GT }>&gt;</option>
        <option value={ Comparator.EQ }>=</option>
        <option value={ Comparator.LT }>&lt;</option>
      </select>,
      <button
        key="submit"
        className="btn btn-warning"
        onClick={ this.filter }
      >
        { `Filter ${this.props.column.text}` }
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
  filter: customFilter({
    type: FILTER_TYPES.NUMBER // ask react-bootstrap-table to filter data as number 
  }),
  filterRenderer: (onFilter, column) =>
    <PriceFilter onFilter={ onFilter } column={ column } />
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, customFilter, Comparator, FILTER_TYPES } from 'react-bootstrap-table2-filter';

class PriceFilter extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.getValue = this.getValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { value: 2100 };
  }
  onChange(e) {
    this.setState({ value: e.target.value });
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }
  filter() {
    this.props.onFilter({
      number: this.getValue(),
      comparator: this.select.value
    });
  }
  render() {
    return [
      <input
        key="range"
        ref={ node => this.range = node }
        type="range"
        min="2100"
        max="2110"
        onChange={ this.onChange }
      />,
      <p
        key="show"
        ref={ node => this.showValue = node }
        style={ { textAlign: 'center' } }
      >
        { this.state.value }
      </p>,
      <select
        key="select"
        ref={ node => this.select = node }
        className="form-control"
      >
        <option value={ Comparator.GT }>&gt;</option>
        <option value={ Comparator.EQ }>=</option>
        <option value={ Comparator.LT }>&lt;</option>
      </select>,
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
  filter: customFilter({
    type: FILTER_TYPES.NUMBER // ask react-bootstrap-table to filter data as number 
  }),
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
