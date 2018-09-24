/* eslint react/prop-types: 0 */
import React from 'react';
import { DELAY_FOR_DBCLICK, DBCLICK_TO_CELL_EDIT, CLICK_TO_CELL_EDIT } from './const';
import { Consumer } from './context';

export default (Component, selectRowEnabled) => {
  const renderWithCellEdit = (props, cellEdit) => {
    const key = props.value;
    const editableRow = !(
      cellEdit.nonEditableRows.length > 0 &&
      cellEdit.nonEditableRows.indexOf(key) > -1
    );

    const attrs = {};

    if (selectRowEnabled && cellEdit.mode === DBCLICK_TO_CELL_EDIT) {
      attrs.DELAY_FOR_DBCLICK = DELAY_FOR_DBCLICK;
    }

    return (
      <Component
        { ...props }
        { ...attrs }
        editingRowIdx={ cellEdit.ridx }
        editingColIdx={ cellEdit.cidx }
        editable={ editableRow }
        onStart={ cellEdit.onStart }
        clickToEdit={ cellEdit.mode === CLICK_TO_CELL_EDIT }
        dbclickToEdit={ cellEdit.mode === DBCLICK_TO_CELL_EDIT }
      />
    );
  };
  function withConsumer(props) {
    return (
      <Consumer>
        { cellEdit => renderWithCellEdit(props, cellEdit) }
      </Consumer>
    );
  }

  withConsumer.displayName = 'WithCellEditingRowConsumer';
  return withConsumer;
};
