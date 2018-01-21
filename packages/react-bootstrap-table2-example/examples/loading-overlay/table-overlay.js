/* eslint react/no-multi-comp: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(87);

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
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';

// ...
const RemotePagination = ({ loading, data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      loading={ loading }
      keyField="id"
      data={ data }
      columns={ columns }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
      overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemotePagination.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      data: products.slice(0, 10),
      sizePerPage: 10
    };
  }

  handleTableChange = ({ page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        loading: false,
        data: products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 3000);
    this.setState(() => ({ loading: true }));
  }

  render() {
    const { data, sizePerPage, page, loading } = this.state;
    return (
      <RemotePagination
        data={ data }
        page={ page }
        loading={ loading }
        sizePerPage={ sizePerPage }
        totalSize={ products.length }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemotePagination = ({ loading, data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      loading={ loading }
      keyField="id"
      data={ data }
      columns={ columns }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
      overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemotePagination.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      data: products.slice(0, 10),
      sizePerPage: 10
    };
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        loading: false,
        data: products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 3000);
    this.setState(() => ({ loading: true }));
  }

  render() {
    const { data, sizePerPage, page, loading } = this.state;
    return (
      <RemotePagination
        data={ data }
        page={ page }
        loading={ loading }
        sizePerPage={ sizePerPage }
        totalSize={ products.length }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}

export default Container;
