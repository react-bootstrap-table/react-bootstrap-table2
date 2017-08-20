import React from 'react';
import PropTypes from 'prop-types';

import Cell from './cell';

const Row = ({ row, columns }) => (
  <tr>
    {
      columns.map(column =>
        <Cell key={ row[column.dataField] } value={ row[column.dataField] } />
      )
    }
  </tr>
);

Row.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};

export default Row;
