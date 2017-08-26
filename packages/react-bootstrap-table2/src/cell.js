import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';

const Cell = ({ row, rowIndex, column, columnIndex }) => {
  const {
    dataField,
    formatter,
    formatExtraData,
    style,
    classes,
    title,
    events,
    align
  } = column;
  let cellTitle;
  let cellStyle = {};
  let content = _.get(row, dataField);

  const attrs = {
    ...events
  };
  const cellClasses = _.isFunction(classes) ? classes(content, row, columnIndex) : classes;

  if (style) {
    cellStyle = _.isFunction(style) ? style(content, row, columnIndex) : style;
  }

  if (title) {
    cellTitle = _.isFunction(title) ? title(content, row, columnIndex) : content;
    attrs.title = cellTitle;
  }

  if (formatter) {
    content = column.formatter(content, row, rowIndex, formatExtraData);
  }

  if (align) {
    cellStyle.textAlign = _.isFunction(align) ? align(content, row, columnIndex) : align;
  }

  attrs.style = cellStyle;
  attrs.className = cellClasses;

  return (
    <td { ...attrs }>{ content }</td>
  );
};

Cell.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired
};

export default Cell;
