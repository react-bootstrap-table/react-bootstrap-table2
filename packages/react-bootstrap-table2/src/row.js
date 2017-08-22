import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Cell from './cell';

const Row = ({ row, rowIndex, columns }) => (
  <tr>
    {
      columns.map((column, index) =>
        (
          <Cell
            key={ _.get(row, column.dataField) }
            row={ row }
            rowIndex={ rowIndex }
            columnIndex={ index }
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
