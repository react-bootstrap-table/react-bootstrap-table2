/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Cell from './cell';
import SelectionCell from './row-selection/selection-cell';
import EditingCell from './cell-edit/editing-cell';
import Const from './const';

const Row = (props) => {
  const {
    row,
    columns,
    keyField,
    rowIndex,
    className,
    style,
    cellEdit,
    selected,
    selectRow,
    editable: editableRow
  } = props;

  const {
    mode,
    onStart,
    ridx: editingRowIdx,
    cidx: editingColIdx,
    ...rest
  } = cellEdit;

  const key = _.get(row, keyField);
  const { nonSelectable } = selectRow;

  return (
    <tr style={ style } className={ className }>
      {
        selectRow.mode === Const.ROW_SELECT_DISABLED
          ? null
          : (
            <SelectionCell
              { ...selectRow }
              rowKey={ _.get(row, keyField) }
              selected={ selected }
              disabled={ nonSelectable && nonSelectable.includes(key) }
            />
          )
      }
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
            let editCellstyle = column.editCellStyle || {};
            let editCellclasses = column.editCellClasses;
            if (_.isFunction(column.editCellStyle)) {
              editCellstyle = column.editCellStyle(content, row, rowIndex, index);
            }
            if (_.isFunction(column.editCellClasses)) {
              editCellclasses = column.editCellClasses(content, row, rowIndex, index);
            }
            return (
              <EditingCell
                key={ content }
                row={ row }
                column={ column }
                className={ editCellclasses }
                style={ editCellstyle }
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
  columns: PropTypes.array.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

Row.defaultProps = {
  editable: true,
  style: {},
  className: null
};

export default Row;
