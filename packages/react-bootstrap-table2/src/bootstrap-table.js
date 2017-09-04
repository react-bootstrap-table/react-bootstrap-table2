/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import Header from './header';
import Body from './body';
import Store from './store/base';
import PropsBaseResolver from './props-resolver';

class BootstrapTable extends PropsBaseResolver(Component) {
  constructor(props) {
    super(props);
    this.validateProps();
    const { store } = this.props;
    this.store = !store ? new Store(props) : store;

    this.handleSort = this.handleSort.bind(this);
    this.state = {
      data: this.store.get()
    };
  }

  render() {
    const {
      columns,
      keyField,
      striped,
      hover,
      bordered,
      condensed,
      noDataIndication
    } = this.props;

    const tableClass = cs('table', {
      'table-striped': striped,
      'table-hover': hover,
      'table-bordered': bordered,
      'table-condensed': condensed
    });

    return (
      <div className="react-bootstrap-table-container">
        <table className={ tableClass }>
          <Header
            columns={ columns }
            sortField={ this.store.sortField }
            sortOrder={ this.store.sortOrder }
            onSort={ this.handleSort }
          />
          <Body
            data={ this.state.data }
            keyField={ keyField }
            columns={ columns }
            isEmpty={ this.isEmpty() }
            visibleColumnSize={ this.visibleColumnSize() }
            noDataIndication={ noDataIndication }
          />
        </table>
      </div>
    );
  }

  handleSort(column) {
    this.store.sortBy(column);

    this.setState(() => {
      return {
        data: this.store.get()
      };
    });
  }
}

BootstrapTable.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  store: PropTypes.object,
  noDataIndication: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  condensed: PropTypes.bool
};

BootstrapTable.defaultProps = {
  striped: false,
  bordered: true,
  hover: false,
  condensed: false,
  noDataIndication: null
};

export default BootstrapTable;
