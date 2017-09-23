/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Cell from './cell';
import CellSelectColumn from './row-selection/cell-select-column';
import EditingCell from './editing-cell';

const Row = (props) => {
  const {
    row,
    columns,
    keyField,
    rowIndex,
    cellEdit,
    selectRowProps,
    selectedRowKeys,
    handleSelectRow,
    editable: editableRow
  } = props;
  const {
    mode,
    onStart,
    ridx: editingRowIdx,
    cidx: editingColIdx,
    ...rest
  } = cellEdit;
  return (
    <tr>
      {<CellSelectColumn
        row={row}
        keyField={keyField}
        selectRowProps={selectRowProps}
        selectedRowKeys={selectedRowKeys}
        handleSelectRow={handleSelectRow}
      />}
      {
        columns.map((column, index) => {
          const { dataField } = column;
          const content = _.get(row, dataField);
          let editable = _.isDefined(column.editable) ? column.editable : true;
          if (dataField === keyField || !editableRow) editable = false;
          if (_.isFunction(column.editable)) {
            editable = column.editable(content, row, rowIndex, index);
          }
          if (rowIndex === editingRowIdx && index === editingColIdx) {
            return (
              <EditingCell
                key={ content }
                row={ row }
                column={ column }
                { ...rest }
              />
            );
          }
          return (
            <Cell
              key={ content }
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
