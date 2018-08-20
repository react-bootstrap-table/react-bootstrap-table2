/* eslint react/prop-types: 0 */
import React from 'react';
import { CLICK_TO_CELL_EDIT, DBCLICK_TO_CELL_EDIT } from './const';

import { Consumer } from './context';

export default (Component, keyField, _) => {
  const renderWithCellEdit = (props, cellEdit) => {
    const content = _.get(props.row, props.column.dataField);
    const editableRow = props.editable;

    let editable = _.isDefined(props.column.editable) ? props.column.editable : true;
    if (props.column.dataField === keyField || !editableRow) editable = false;
    if (_.isFunction(props.column.editable)) {
      editable = props.column.editable(
        content,
        props.row,
        props.rowIndex,
        props.columnIndex
      );
    }

    return (
      <Component
        { ...props }
        onStart={ cellEdit.onStart }
        editable={ editable }
        clickToEdit={ cellEdit.mode === CLICK_TO_CELL_EDIT }
        dbclickToEdit={ cellEdit.mode === DBCLICK_TO_CELL_EDIT }
      />
    );
  };
  return props => (
    <Consumer>
      { cellEdit => renderWithCellEdit(props, cellEdit) }
    </Consumer>
  );
};
