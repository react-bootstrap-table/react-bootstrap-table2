import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import Header from './header';
import Body from './body';
import storeBase from './store/base';

class BootstrapTable extends storeBase(Component) {
  constructor(props) {
    super(props);
    this.validateProps();
  }

  render() {
    const {
      columns,
      keyField,
      striped,
      hover,
      bordered,
      condensed
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
          <Header columns={ columns } />
          <Body
            data={ this.data }
            keyField={ keyField }
            columns={ columns }
          />
        </table>
      </div>
    );
  }
}

BootstrapTable.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  striped: PropTypes.bool
};

BootstrapTable.defaultProps = {
  striped: false,
  bordered: true,
  hover: false,
  condensed: false
};

export default BootstrapTable;
