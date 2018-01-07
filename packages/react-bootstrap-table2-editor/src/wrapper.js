/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CLICK_TO_CELL_EDIT, DBCLICK_TO_CELL_EDIT } from './const';

export default (
  Base,
  { _, remoteResolver }
) => {
  let EditingCell;
  return class CellEditWrapper extends remoteResolver(Component) {
    static propTypes = {
      options: PropTypes.shape({
        mode: PropTypes.oneOf([CLICK_TO_CELL_EDIT, DBCLICK_TO_CELL_EDIT]).isRequired,
        onErrorMessageDisappear: PropTypes.func,
        blurToSave: PropTypes.bool,
        beforeSaveCell: PropTypes.func,
        afterSaveCell: PropTypes.func,
        nonEditableRows: PropTypes.func,
        timeToCloseMessage: PropTypes.number,
        errorMessage: PropTypes.string
      })
    }

    constructor(props) {
      super(props);
      EditingCell = props.cellEdit.editingCellFactory(_);
      this.startEditing = this.startEditing.bind(this);
      this.escapeEditing = this.escapeEditing.bind(this);
      this.completeEditing = this.completeEditing.bind(this);
      this.handleCellUpdate = this.handleCellUpdate.bind(this);
      this.state = {
        ridx: null,
        cidx: null,
        message: null,
        isDataChanged: false
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.cellEdit && this.isRemoteCellEdit()) {
        if (nextProps.cellEdit.options.errorMessage) {
          this.setState(() => ({
            isDataChanged: false,
            message: nextProps.cellEdit.options.errorMessage
          }));
        } else {
          this.setState(() => ({
            isDataChanged: true
          }));
          this.escapeEditing();
        }
      } else {
        this.setState(() => ({
          isDataChanged: false
        }));
      }
    }

    handleCellUpdate(row, column, newValue) {
      const { keyField, cellEdit, store } = this.props;
      const { beforeSaveCell, afterSaveCell } = cellEdit.options;
      const oldValue = _.get(row, column.dataField);
      const rowId = _.get(row, keyField);
      if (_.isFunction(beforeSaveCell)) beforeSaveCell(oldValue, newValue, row, column);
      if (this.isRemoteCellEdit()) {
        this.handleCellChange(rowId, column.dataField, newValue);
      } else {
        store.edit(rowId, column.dataField, newValue);
        if (_.isFunction(afterSaveCell)) afterSaveCell(oldValue, newValue, row, column);
        this.completeEditing();
      }
    }

    completeEditing() {
      this.setState(() => ({
        ridx: null,
        cidx: null,
        message: null,
        isDataChanged: true
      }));
    }

    startEditing(ridx, cidx) {
      const editing = () => {
        this.setState(() => ({
          ridx,
          cidx,
          isDataChanged: false
        }));
      };

      const { selectRow } = this.props;
      if (!selectRow || (selectRow.clickToEdit || !selectRow.clickToSelect)) editing();
    }

    escapeEditing() {
      this.setState(() => ({
        ridx: null,
        cidx: null
      }));
    }

    render() {
      const { isDataChanged, ...stateRest } = this.state;
      const {
        cellEdit: {
          options: { nonEditableRows, errorMessage, ...optionsRest },
          editingCellFactory,
          ...cellEditRest
        }
      } = this.props;
      const newCellEdit = {
        ...optionsRest,
        ...cellEditRest,
        ...stateRest,
        EditingCell,
        nonEditableRows: _.isDefined(nonEditableRows) ? nonEditableRows() : [],
        onStart: this.startEditing,
        onEscape: this.escapeEditing,
        onUpdate: this.handleCellUpdate
      };

      return (
        <Base
          { ...this.props }
          data={ this.props.store.data }
          isDataChanged={ isDataChanged }
          cellEdit={ newCellEdit }
        />
      );
    }
  };
};
