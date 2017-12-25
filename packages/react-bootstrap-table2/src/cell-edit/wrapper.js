/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import _ from '../utils';

export default (Base, parentProps) =>
  class CellEditWrapper extends Component {
    constructor(props) {
      super(props);
      this.startEditing = this.startEditing.bind(this);
      this.escapeEditing = this.escapeEditing.bind(this);
      this.completeEditing = this.completeEditing.bind(this);
      this.handleCellUpdate = this.handleCellUpdate.bind(this);
      this.updateEditingWithErr = this.updateEditingWithErr.bind(this);
      this.state = {
        ridx: null,
        cidx: null,
        message: null,
        editing: false
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.cellEdit) {
        if (nextProps.cellEdit.editing) {
          this.setState(() => ({
            ...this.state,
            message: nextProps.cellEdit.errorMessage
          }));
        } else {
          this.escapeEditing();
        }
      }
    }

    handleCellUpdate(row, column, newValue) {
      const { keyField, cellEdit } = this.props;
      const { beforeSaveCell, afterSaveCell } = cellEdit;
      const oldValue = _.get(row, column.dataField);
      const rowId = _.get(row, keyField);
      if (_.isFunction(beforeSaveCell)) beforeSaveCell(oldValue, newValue, row, column);
      if (parentProps.onUpdateCell(rowId, column.dataField, newValue)) {
        if (_.isFunction(afterSaveCell)) afterSaveCell(oldValue, newValue, row, column);
        this.completeEditing();
      }
    }

    completeEditing() {
      this.setState(() => ({
        ridx: null,
        cidx: null,
        message: null,
        editing: false
      }));
    }

    startEditing(ridx, cidx) {
      const editing = () => {
        this.setState(() => ({
          ridx,
          cidx,
          editing: true
        }));
      };

      const { selectRow } = this.props;
      if (!selectRow || (selectRow.clickToEdit || !selectRow.clickToSelect)) editing();
    }

    escapeEditing() {
      this.setState(() => ({
        ridx: null,
        cidx: null,
        editing: false
      }));
    }

    updateEditingWithErr(message) {
      this.setState(() => ({
        ...this.state,
        message
      }));
    }

    render() {
      return (
        <Base
          { ...this.props }
          data={ this.props.store.data }
          onCellUpdate={ this.handleCellUpdate }
          onStartEditing={ this.startEditing }
          onEscapeEditing={ this.escapeEditing }
          currEditCell={ { ...this.state } }
        />
      );
    }
  };
