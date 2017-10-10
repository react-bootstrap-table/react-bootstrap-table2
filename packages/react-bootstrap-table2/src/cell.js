/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Const from './const';
import _ from './utils';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleEditingCell = this.handleEditingCell.bind(this);
  }

  handleEditingCell(e) {
    const { editMode, column, onStart, rowIndex, columnIndex } = this.props;
    const { events } = column;
    if (events) {
      if (editMode === Const.CLICK_TO_CELL_EDIT) {
        const customClick = events.onClick;
        if (_.isFunction(customClick)) customClick(e);
      } else {
        const customDbClick = events.onDoubleClick;
        if (_.isFunction(customDbClick)) customDbClick(e);
      }
    }
    onStart(rowIndex, columnIndex);
  }

  render() {
    const {
      row,
      rowIndex,
      column,
      columnIndex,
      editMode,
      editable
    } = this.props;
    const {
      dataField,
      hidden,
      formatter,
      formatExtraData,
      style,
      classes,
      title,
      events,
      align,
      attrs
    } = column;
    let cellTitle;
    let cellStyle = {};
    let content = _.get(row, dataField);

    const cellAttrs = {
      ..._.isFunction(attrs) ? attrs(content, row, rowIndex, columnIndex) : attrs,
      ...events
    };

    const cellClasses = _.isFunction(classes)
      ? classes(content, row, rowIndex, columnIndex)
      : classes;

    const setEditMode = () => {
      if (editMode === Const.CLICK_TO_CELL_EDIT) {
        cellAttrs.onClick = this.handleEditingCell;
      } else {
        cellAttrs.onDoubleClick = this.handleEditingCell;
      }
    };

    if (style) {
      cellStyle = _.isFunction(style) ? style(content, row, rowIndex, columnIndex) : style;
    }

    if (title) {
      cellTitle = _.isFunction(title) ? title(content, row, rowIndex, columnIndex) : content;
      cellAttrs.title = cellTitle;
    }

    if (formatter) {
      content = column.formatter(content, row, rowIndex, formatExtraData);
    }

    if (align) {
      cellStyle.textAlign =
        _.isFunction(align) ? align(content, row, rowIndex, columnIndex) : align;
    }

    if (hidden) {
      cellStyle.display = 'none';
    }

    if (cellClasses) cellAttrs.className = cellClasses;

    if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;
    if (editable && editMode !== Const.UNABLE_TO_CELL_EDIT) {
      setEditMode();
    }
    return (
      <td { ...cellAttrs }>{ content }</td>
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
