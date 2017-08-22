import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';

const Cell = ({ row, rowIndex, column, columnIndex }) => {
  const {
    dataField,
    formatter,
    formatExtraData,
    style,
    classes
  } = column;
  let content = _.get(row, dataField);
  const cellStyle = _.isFunction(style) ? style(content, row, columnIndex) : style;
  const cellClasses = _.isFunction(classes) ? classes(content, row, columnIndex) : classes;
  if (formatter) {
    content = column.formatter(content, row, rowIndex, formatExtraData);
  }

  const attrs = {
    style: cellStyle,
    className: cellClasses
  };
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
