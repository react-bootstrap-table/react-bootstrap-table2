import React from 'react';
import PropTypes from 'prop-types';

import Cell from './cell';

const Row = ({ row, rowIndex, columns }) => (
  <tr>
    {
      columns.map(column =>
        (
          <Cell
            key={ row[column.dataField] }
            row={ row }
            rowIndex={ rowIndex }
            column={ column }
          />
        ))
    }
  </tr>
);

Row.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired
};

export default Row;
