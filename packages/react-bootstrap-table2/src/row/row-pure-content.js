/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
/* eslint no-plusplus: 0 */
import React from 'react';

import _ from '../utils';
import Cell from '../cell';

export default class RowPureContent extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (typeof nextProps.shouldUpdate !== 'undefined') {
      return nextProps.shouldUpdate;
    }
    return true;
  }

  render() {
    const {
      row,
      keyField,
      columns,
      rowIndex,
      editable,
      editingRowIdx,
      editingColIdx,
      onStart,
      clickToEdit,
      dbclickToEdit,
      EditingCellComponent,
      tabIndexStart
    } = this.props;

    let tabIndex = tabIndexStart;

    return columns.map((column, index) => {
      if (!column.hidden) {
        const { dataField } = column;
        const content = _.get(row, dataField);
        if (rowIndex === editingRowIdx && index === editingColIdx) {
          return (
            <EditingCellComponent
              key={ `${content}-${index}-editing` }
              row={ row }
              rowIndex={ rowIndex }
              column={ column }
              columnIndex={ index }
            />
          );
        }
        // render cell
        let cellTitle;
        let cellStyle = {};
        const cellAttrs = {
          ..._.isFunction(column.attrs)
            ? column.attrs(content, row, rowIndex, index)
            : column.attrs,
          ...column.events
        };

        const cellClasses = _.isFunction(column.classes)
          ? column.classes(content, row, rowIndex, index)
          : column.classes;

        if (column.style) {
          cellStyle = _.isFunction(column.style)
            ? column.style(content, row, rowIndex, index)
            : column.style;
          cellStyle = Object.assign({}, cellStyle) || {};
        }

        if (column.title) {
          cellTitle = _.isFunction(column.title)
            ? column.title(content, row, rowIndex, index)
            : content;
          cellAttrs.title = cellTitle;
        }

        if (column.align) {
          cellStyle.textAlign =
            _.isFunction(column.align)
              ? column.align(content, row, rowIndex, index)
              : column.align;
        }

        if (cellClasses) cellAttrs.className = cellClasses;
        if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

        let editableCell = _.isDefined(column.editable) ? column.editable : true;
        if (column.dataField === keyField || !editable) editableCell = false;
        if (_.isFunction(column.editable)) {
          editableCell = column.editable(content, row, rowIndex, index);
        }

        if (tabIndexStart !== -1) {
          cellAttrs.tabIndex = tabIndex++;
        }

        return (
          <Cell
            key={ `${content}-${index}` }
            row={ row }
            editable={ editableCell }
            rowIndex={ rowIndex }
            columnIndex={ index }
            column={ column }
            onStart={ onStart }
            clickToEdit={ clickToEdit }
            dbclickToEdit={ dbclickToEdit }
            { ...cellAttrs }
          />
        );
      }
      return false;
    });
  }
}
