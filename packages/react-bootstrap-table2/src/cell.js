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
    events
  } = column;
  let content = _.get(row, dataField);
  let cellTitle;

  const attrs = {
    ...events
  };
  const cellStyle = _.isFunction(style) ? style(content, row, columnIndex) : style;
  const cellClasses = _.isFunction(classes) ? classes(content, row, columnIndex) : classes;

  if (title) {
    cellTitle = _.isFunction(title) ? title(content, row, columnIndex) : content;
    attrs.title = cellTitle;
  }

  if (formatter) {
    content = column.formatter(content, row, rowIndex, formatExtraData);
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
