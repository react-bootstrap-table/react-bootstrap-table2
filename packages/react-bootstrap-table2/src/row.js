/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Cell from './cell';
import EditingCell from './editing-cell';

const Row = (props) => {
  const {
    row,
    columns,
    keyField,
    rowIndex,
    cellEdit,
    editable: editableRow
  } = props;
  const {
    ridx: editingRowIdx,
    cidx: editingColIdx,
    mode,
    onStart,
    onEscape,
    onComplete,
    blurToSave
  } = cellEdit;
  return (
    <tr>
      {
        columns.map((column, index) => {
          let editable = _.isDefined(column.editable) ? column.editable : true;
          if (column.dataField === keyField || !editableRow) editable = false;
          if (rowIndex === editingRowIdx && index === editingColIdx) {
            return (
              <EditingCell
                key={ _.get(row, column.dataField) }
                row={ row }
                column={ column }
                blurToSave={ blurToSave }
                onComplete={ onComplete }
                onEscape={ onEscape }
              />
            );
          }
          return (
            <Cell
              key={ _.get(row, column.dataField) }
              row={ row }
              rowIndex={ rowIndex }
              columnIndex={ index }
              column={ column }
              editMode={ mode }
              editable={ editable }
              onStart={ onStart }
            />
          );
        })
      }
    </tr>
  );
};

Row.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired
};

Row.defaultProps = {
  editable: true
};

export default Row;
