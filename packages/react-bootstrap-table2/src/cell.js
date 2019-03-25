/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import eventDelegater from './cell-event-delegater';
import _ from './utils';

class Cell extends eventDelegater(Component) {
  constructor(props) {
    super(props);
    this.handleEditingCell = this.handleEditingCell.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = false;
    if (nextProps.column.isDummyField) {
      shouldUpdate = !_.isEqual(this.props.row, nextProps.row);
    } else {
      shouldUpdate =
        _.get(this.props.row, this.props.column.dataField)
          !== _.get(nextProps.row, nextProps.column.dataField);
    }

    if (shouldUpdate) return true;

    // if (nextProps.formatter)

    shouldUpdate =
      (nextProps.column.formatter ? !_.isEqual(this.props.row, nextProps.row) : false) ||
      this.props.column.hidden !== nextProps.column.hidden ||
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.columnIndex !== nextProps.columnIndex ||
      this.props.className !== nextProps.className ||
      this.props.title !== nextProps.title ||
      this.props.editable !== nextProps.editable ||
      this.props.clickToEdit !== nextProps.clickToEdit ||
      this.props.dbclickToEdit !== nextProps.dbclickToEdit ||
      !_.isEqual(this.props.style, nextProps.style) ||
      !_.isEqual(this.props.column.formatExtraData, nextProps.column.formatExtraData) ||
      !_.isEqual(this.props.column.events, nextProps.column.events) ||
      !_.isEqual(this.props.column.attrs, nextProps.column.attrs) ||
      this.props.tabIndex !== nextProps.tabIndex;
    return shouldUpdate;
  }

  handleEditingCell(e) {
    const { column, onStart, rowIndex, columnIndex, clickToEdit, dbclickToEdit } = this.props;
    const { events } = column;
    if (events) {
      if (clickToEdit) {
        const customClick = events.onClick;
        if (_.isFunction(customClick)) customClick(e);
      } else if (dbclickToEdit) {
        const customDbClick = events.onDoubleClick;
        if (_.isFunction(customDbClick)) customDbClick(e);
      }
    }
    if (onStart) {
      onStart(rowIndex, columnIndex);
    }
  }

  render() {
    const {
      row,
      rowIndex,
      column,
      columnIndex,
      onStart,
      editable,
      clickToEdit,
      dbclickToEdit,
      ...rest
    } = this.props;
    const {
      dataField,
      formatter,
      formatExtraData
    } = column;
    const attrs = this.delegate({ ...rest });
    let content = column.isDummyField ? null : _.get(row, dataField);

    if (formatter) {
      content = column.formatter(content, row, rowIndex, formatExtraData);
    }

    if (clickToEdit && editable) {
      attrs.onClick = this.handleEditingCell;
    } else if (dbclickToEdit && editable) {
      attrs.onDoubleClick = this.handleEditingCell;
    }

    return (
      <td { ...attrs }>
        { typeof content === 'boolean' ? `${content}` : content }
      </td>
    );
  }
}

Cell.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired
};

export default Cell;
