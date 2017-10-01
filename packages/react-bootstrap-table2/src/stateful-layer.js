/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
/* eslint no-return-assign: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Store from './store/base';
import _ from './utils';

const withStateful = (Base) => {
  class StatefulComponent extends Component {
    constructor(props) {
      super(props);
      this.store = new Store(props);
      this.handleUpdateCell = this.handleUpdateCell.bind(this);
    }

    handleUpdateCell(rowId, dataField, newValue) {
      const { cellEdit } = this.props;
      // handle cell editing internal
      if (!cellEdit.onEditing) {
        this.store.edit(rowId, dataField, newValue);
        return true;
      }

      // handle cell editing external
      const result = cellEdit.onEditing(rowId, dataField, newValue);
      if (_.isDefined(result)) { // TODO: should be a promise here
        result.then((response) => {
          if (response.forceUpdate) {
            this.updateCell(rowId, dataField, response.value || newValue);
            this.table.completeEditing();
          }
        }).catch((e) => {
          this.table.updateEditingWithErr(e.message);
        });
      }
      return false;
    }

    render() {
      return (
        <Base
          { ...this.props }
          ref={ node => this.table = node }
          store={ this.store }
          onUpdateCell={ this.handleUpdateCell }
        />
      );
    }
  }
  return StatefulComponent;
};

export default withStateful;
