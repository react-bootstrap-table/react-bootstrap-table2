/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import Header from './header';
import Body from './body';
import Store from './store/base';
import PropsBaseResolver from './props-resolver';
import Const from './const';
import _ from './utils';

class BootstrapTable extends PropsBaseResolver(Component) {
  constructor(props) {
    super(props);
    this.validateProps();
    const { store } = this.props;
    this.store = !store ? new Store(props) : store;

    this.handleSort = this.handleSort.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.escapeEditing = this.escapeEditing.bind(this);
    this.completeEditing = this.completeEditing.bind(this);
    this.state = {
      data: this.store.get(),
      currEditCell: {
        ridx: null,
        cidx: null
      }
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

    const cellEditInfo = this.resolveCellEditProps({
      onStart: this.startEditing,
      onEscape: this.escapeEditing,
      onComplete: this.completeEditing
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
            cellEdit={ cellEditInfo }
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

  completeEditing(row, column, newValue) {
    const { cellEdit, keyField } = this.props;
    const { beforeSaveCell, onEditing, afterSaveCell } = cellEdit;
    const oldValue = _.get(row, column.dataField);
    const rowId = _.get(row, keyField);
    if (_.isFunction(beforeSaveCell)) beforeSaveCell(oldValue, newValue, row, column);
    onEditing(rowId, column.dataField, newValue);
    if (_.isFunction(afterSaveCell)) afterSaveCell(oldValue, newValue, row, column);

    this.setState(() => {
      return {
        data: this.store.get(),
        currEditCell: { ridx: null, cidx: null }
      };
    });
  }

  startEditing(ridx, cidx) {
    this.setState(() => {
      return {
        currEditCell: { ridx, cidx }
      };
    });
  }

  escapeEditing() {
    this.setState(() => {
      return {
        currEditCell: { ridx: null, cidx: null }
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
  condensed: PropTypes.bool,
  cellEdit: PropTypes.shape({
    mode: PropTypes.oneOf([Const.CLICK_TO_CELL_EDIT, Const.DBCLICK_TO_CELL_EDIT]).isRequired,
    onEditing: PropTypes.func.isRequired,
    blurToSave: PropTypes.bool,
    beforeSaveCell: PropTypes.func,
    afterSaveCell: PropTypes.func,
    nonEditableRows: PropTypes.func
  })
};

BootstrapTable.defaultProps = {
  striped: false,
  bordered: true,
  hover: false,
  condensed: false,
  noDataIndication: null
};

export default BootstrapTable;
