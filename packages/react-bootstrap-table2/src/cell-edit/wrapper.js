/* eslint arrow-body-style: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from '../utils';

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
        this.setState(() => {
          return {
            ...this.state,
            message: nextProps.cellEdit.errorMessage
          };
        });
      } else {
        this.escapeEditing();
      }
    }
  }

  handleCellUpdate(row, column, newValue) {
    const { keyField, cellEdit, onUpdateCell } = this.props;
    const { beforeSaveCell, afterSaveCell } = cellEdit;
    const oldValue = _.get(row, column.dataField);
    const rowId = _.get(row, keyField);
    if (_.isFunction(beforeSaveCell)) beforeSaveCell(oldValue, newValue, row, column);
    if (onUpdateCell(rowId, column.dataField, newValue)) {
      if (_.isFunction(afterSaveCell)) afterSaveCell(oldValue, newValue, row, column);
      this.completeEditing();
    }
  }

  completeEditing() {
    this.setState(() => {
      return {
        ridx: null,
        cidx: null,
        message: null,
        editing: false
      };
    });
  }

  startEditing(ridx, cidx) {
    this.setState(() => {
      return {
        ridx,
        cidx,
        editing: true
      };
    });
  }

  escapeEditing() {
    this.setState(() => {
      return {
        ridx: null,
        cidx: null,
        editing: false
      };
    });
  }

  updateEditingWithErr(message) {
    this.setState(() => {
      return {
        ...this.state,
        message
      };
    });
  }

  render() {
    return React.cloneElement(this.props.elem, {
      onCellUpdate: this.handleCellUpdate,
      onStartEditing: this.startEditing,
      onEscapeEditing: this.escapeEditing,
      currEditCell: { ...this.state }
    });
  }
}

CellEditWrapper.propTypes = {
  elem: PropTypes.element.isRequired,
  onUpdateCell: PropTypes.func.isRequired
};

export default CellEditWrapper;
