/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Cell from './cell';
import eventDelegater from './row-event-delegater';

class Row extends eventDelegater(Component) {
  render() {
    const {
      row,
      columns,
      rowIndex,
      className,
      style,
      attrs,
      editable,
      editingRowIdx,
      editingColIdx
    } = this.props;
    const CellComponent = this.props.CellComponent || Cell;
    const trAttrs = this.delegate(attrs);

    return (
      <tr style={ style } className={ className } { ...trAttrs }>
        { this.props.children }
        {
          columns.map((column, index) => {
            if (!column.hidden) {
              const { dataField } = column;
              const content = _.get(row, dataField);
              if (rowIndex === editingRowIdx && index === editingColIdx) {
                const EditingCell = this.props.EditingCellComponent;
                return (
                  <EditingCell
                    key={ `${content}-${index}` }
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

              return (
                <CellComponent
                  key={ `${content}-${index}` }
                  row={ row }
                  editable={ editable }
                  rowIndex={ rowIndex }
                  columnIndex={ index }
                  column={ column }
                  { ...cellAttrs }
                />
              );
            }
            return false;
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
