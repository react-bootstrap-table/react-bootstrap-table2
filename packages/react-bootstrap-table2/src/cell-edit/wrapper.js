/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import _ from '../utils';
import remoteResolver from '../props-resolver/remote-resolver';

export default Base =>
  class CellEditWrapper extends remoteResolver(Component) {
    constructor(props) {
      super(props);
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
        if (nextProps.cellEdit.errorMessage) {
          this.setState(() => ({
            isDataChanged: false,
            message: nextProps.cellEdit.errorMessage
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
      const { beforeSaveCell, afterSaveCell } = cellEdit;
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
      const { isDataChanged, ...rest } = this.state;
      return (
        <Base
          { ...this.props }
          isDataChanged={ isDataChanged }
          data={ this.props.store.data }
          onCellUpdate={ this.handleCellUpdate }
          onStartEditing={ this.startEditing }
          onEscapeEditing={ this.escapeEditing }
          currEditCell={ { ...rest } }
        />
      );
    }
  };
