import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Body from './body';
import storeBase from './store/base';

class BootstrapTable extends storeBase(Component) {
  constructor(props) {
    super(props);
    this.validateProps();
  }

  render() {
    const { columns, keyField } = this.props;
    return (
      <div className="react-bootstrap-table-container">
        <table className="table">
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
  columns: PropTypes.array.isRequired
};

export default BootstrapTable;
