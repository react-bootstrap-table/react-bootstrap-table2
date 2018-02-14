/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Cell from './cell';
import SelectionCell from './row-selection/selection-cell';
import Const from './const';

class Row extends Component {
  constructor(props) {
    super(props);
    this.clickNum = 0;
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleSimpleRowClick = this.handleSimpleRowClick.bind(this);
  }

  handleRowClick(e) {
    const {
      row,
      selected,
      keyField,
      selectable,
      rowIndex,
      selectRow: {
        onRowSelect,
        clickToEdit
      },
      cellEdit: {
        mode,
        DBCLICK_TO_CELL_EDIT,
        DELAY_FOR_DBCLICK
      },
      attrs
    } = this.props;

    const clickFn = () => {
      if (attrs.onClick) {
        attrs.onClick(e, row, rowIndex);
      }
      if (selectable) {
        const key = _.get(row, keyField);
        onRowSelect(key, !selected, rowIndex);
      }
    };

    if (mode === DBCLICK_TO_CELL_EDIT && clickToEdit) {
      this.clickNum += 1;
      _.debounce(() => {
        if (this.clickNum === 1) {
          clickFn();
        }
        this.clickNum = 0;
      }, DELAY_FOR_DBCLICK)();
    } else {
      clickFn();
    }
  }

  handleSimpleRowClick(e) {
    const {
      row,
      rowIndex,
      attrs
    } = this.props;

    attrs.onClick(e, row, rowIndex);
  }

  render() {
    const {
      row,
      columns,
      keyField,
      rowIndex,
      className,
      style,
      attrs,
      cellEdit,
      selected,
      selectRow,
      selectable,
      editable: editableRow
    } = this.props;

    const {
      mode,
      onStart,
      EditingCell,
      ridx: editingRowIdx,
      cidx: editingColIdx,
      CLICK_TO_CELL_EDIT,
      DBCLICK_TO_CELL_EDIT,
      ...rest
    } = cellEdit;

    const key = _.get(row, keyField);
    const { clickToSelect, hideSelectColumn } = selectRow;

    const trAttrs = { ...attrs };
    if (clickToSelect) {
      trAttrs.onClick = this.handleRowClick;
    } else if (attrs.onClick) {
      trAttrs.onClick = this.handleSimpleRowClick;
    }

    return (
      <tr style={ style } className={ className } { ...trAttrs }>
        {
          (selectRow.mode !== Const.ROW_SELECT_DISABLED && !hideSelectColumn)
            ? (
              <SelectionCell
                { ...selectRow }
                rowKey={ key }
                rowIndex={ rowIndex }
                selected={ selected }
                disabled={ !selectable }
              />
            )
            : null
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
                  key={ `${content}-${index}` }
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
                key={ `${content}-${index}` }
                row={ row }
                rowIndex={ rowIndex }
                columnIndex={ index }
                column={ column }
                onStart={ onStart }
                editable={ editable }
                clickToEdit={ mode === CLICK_TO_CELL_EDIT }
                dbclickToEdit={ mode === DBCLICK_TO_CELL_EDIT }
              />
            );
          })
        }
      </tr>
    );
  }
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  attrs: PropTypes.object
};

Row.defaultProps = {
  editable: true,
  style: {},
  className: null,
  attrs: {}
};

export default Row;
