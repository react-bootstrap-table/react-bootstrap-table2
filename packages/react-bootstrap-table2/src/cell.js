import React from 'react';
import PropTypes from 'prop-types';


const Cell = ({ row, rowIndex, column }) => {
  let content = row[column.dataField];
  if (column.formatter) {
    content = column.formatter(content, row, rowIndex, column.formatExtraData);
  }
  return (
    <td>{ content }</td>
  );
};

Cell.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired
};

export default Cell;
