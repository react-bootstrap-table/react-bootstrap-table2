/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Cell from './cell';
import eventDelegater from './row-event-delegater';
import shouldRowUpdater from './row-should-updater';

class Row extends shouldRowUpdater(eventDelegater(Component)) {
  shouldComponentUpdate(nextProps) {
    console.log('lol');
    const shouldUpdate =
      nextProps.shouldUpdate ||
      this.shouldUpdateByWhenEditing(nextProps) ||
      this.shouldUpdatedByNormalProps(nextProps);

    return shouldUpdate;
  }

  render() {
    const {
      row,
      keyField,
      columns,
      rowIndex,
      className,
      style,
      attrs,
      editable,
      editingRowIdx,
      editingColIdx,
      onStart,
      clickToEdit,
      dbclickToEdit
    } = this.props;
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
  attrs: PropTypes.object,
  shouldUpdate: PropTypes.bool
};

Row.defaultProps = {
  editable: true,
  style: {},
  className: null,
  attrs: {},
  shouldUpdate: false
};

export default Row;
