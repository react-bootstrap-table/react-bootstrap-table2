/* eslint guard-for-in: 0 */
/* eslint no-restricted-syntax: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

let products = productsGenerator(87);

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    defaultValue: '8'
  }),
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter(),
  sort: true
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
// ...

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    defaultValue: '8'
  }),
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter(),
  sort: true
}];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const cellEditProps = {
  mode: 'click'
};

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={ data }
      columns={ columns }
      defaultSorted={ defaultSorted }
      filter={ filterFactory() }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      cellEdit={ cellEditFactory(cellEditProps) }
      onTableChange={ onTableChange }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      totalSize: products.length,
      sizePerPage: 10
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      // Handle cell editing
      if (type === 'cellEdit') {
        const { rowId, dataField, newValue } = cellEdit;
        products = products.map((row) => {
          if (row.id === rowId) {
            const newRow = { ...row };
            newRow[dataField] = newValue;
            return newRow;
          }
          return row;
        });
      }
      let result = products;

      // Handle column filters
      result = result.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      // Handle column sort
      if (sortOrder === 'asc') {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        totalSize: result.length,
        sizePerPage
      }));
    }, 2000);
  }

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemoteAll
        data={ data }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ this.state.totalSize }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const cellEditProps = {
  mode: 'click'
};

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <h3>When <code>remote.pagination</code> is enabled, the filtering,
      sorting and searching will also change to remote mode automatically</h3>
    <BootstrapTable
      remote
      keyField="id"
      data={ data }
      columns={ columns }
      defaultSorted={ defaultSorted }
      filter={ filterFactory() }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
      cellEdit={ cellEditFactory(cellEditProps) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      totalSize: products.length,
      sizePerPage: 10
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      // Handle cell editing
      if (type === 'cellEdit') {
        const { rowId, dataField, newValue } = cellEdit;
        products = products.map((row) => {
          if (row.id === rowId) {
            const newRow = { ...row };
            newRow[dataField] = newValue;
            return newRow;
          }
          return row;
        });
      }
      let result = products;
      // Handle column filters
      result = result.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      // Handle column sort
      if (sortOrder === 'asc') {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        totalSize: result.length,
        sizePerPage
      }));
    }, 2000);
  }

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemoteAll
        data={ data }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ this.state.totalSize }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}

export default Container;
