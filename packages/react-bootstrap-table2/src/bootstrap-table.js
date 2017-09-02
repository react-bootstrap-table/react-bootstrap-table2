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
    this.store = new Store(props);
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
            data={ this.store.data }
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
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  condensed: PropTypes.bool
};

BootstrapTable.defaultProps = {
  striped: false,
  bordered: true,
  hover: false,
  condensed: false
};

export default BootstrapTable;
