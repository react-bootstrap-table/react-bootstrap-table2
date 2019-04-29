/* eslint no-return-assign: 0 */
/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(63);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true,
  filter: textFilter()
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

class ExposedFunctionTable extends React.Component {
  handleGetCurrentData = () => {
    console.log(this.node.table.props.data);
  }

  handleGetCurrentData = () => {
    console.log(this.node.table.props.data);
  }

  handleGetSelectedData = () => {
    console.log(this.node.selectionContext.selected);
  }

  handleGetExpandedData = () => {
    console.log(this.node.rowExpandContext.state.expanded);
  }

  handleGetCurrentPage = () => {
    console.log(this.node.paginationContext.currPage);
  }

  handleGetCurrentSizePerPage = () => {
    console.log(this.node.paginationContext.currSizePerPage);
  }

  handleGetCurrentSortColumn = () => {
    console.log(this.node.sortContext.state.sortColumn);
  }

  handleGetCurrentSortOrder = () => {
    console.log(this.node.sortContext.state.sortOrder);
  }

  handleGetCurrentFilter = () => {
    console.log(this.node.filterContext.currFilters);
  }

  render() {
    const expandRow = {
      renderer: row => (
        <div>
          <p>.....</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true
    };
    return (
      <div>
        <button className="btn btn-default" onClick={ this.handleGetCurrentData }>Get Current Display Rows</button>
        <button className="btn btn-default" onClick={ this.handleGetSelectedData }>Get Current Selected Rows</button>
        <button className="btn btn-default" onClick={ this.handleGetExpandedData }>Get Current Expanded Rows</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentPage }>Get Current Page</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentSizePerPage }>Get Current Size Per Page</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentSortColumn }>Get Current Sort Column</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentSortOrder }>Get Current Sort Order</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentFilter }>Get Current Filter Information</button>
        <BootstrapTable
          ref={ n => this.node = n }
          keyField="id"
          data={ products }
          columns={ columns }
          filter={ filterFactory() }
          pagination={ paginationFactory() }
          selectRow={ { mode: 'checkbox', clickToSelect: true } }
          expandRow={ expandRow }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
`;

export default class ExposedFunctionTable extends React.Component {
  handleGetCurrentData = () => {
    console.log(this.node.table.props.data);
  }

  handleGetSelectedData = () => {
    console.log(this.node.selectionContext.selected);
  }

  handleGetExpandedData = () => {
    console.log(this.node.rowExpandContext.state.expanded);
  }

  handleGetCurrentPage = () => {
    console.log(this.node.paginationContext.currPage);
  }

  handleGetCurrentSizePerPage = () => {
    console.log(this.node.paginationContext.currSizePerPage);
  }

  handleGetCurrentSortColumn = () => {
    console.log(this.node.sortContext.state.sortColumn);
  }

  handleGetCurrentSortOrder = () => {
    console.log(this.node.sortContext.state.sortOrder);
  }

  handleGetCurrentFilter = () => {
    console.log(this.node.filterContext.currFilters);
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
      showExpandColumn: true
    };
    return (
      <div>
        <button className="btn btn-default" onClick={ this.handleGetCurrentData }>Get Current Display Rows</button>
        <button className="btn btn-default" onClick={ this.handleGetSelectedData }>Get Current Selected Rows</button>
        <button className="btn btn-default" onClick={ this.handleGetExpandedData }>Get Current Expanded Rows</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentPage }>Get Current Page</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentSizePerPage }>Get Current Size Per Page</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentSortColumn }>Get Current Sort Column</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentSortOrder }>Get Current Sort Order</button>
        <button className="btn btn-default" onClick={ this.handleGetCurrentFilter }>Get Current Filter Information</button>
        <BootstrapTable
          ref={ n => this.node = n }
          keyField="id"
          data={ products }
          columns={ columns }
          filter={ filterFactory() }
          pagination={ paginationFactory() }
          selectRow={ { mode: 'checkbox', clickToSelect: true } }
          expandRow={ expandRow }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
