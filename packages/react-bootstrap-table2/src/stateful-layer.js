/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
/* eslint no-return-assign: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Store from './store/base';
import CellEditWrapper from './cell-edit/wrapper';
import _ from './utils';

const withStateful = (Base) => {
  class StatefulComponent extends Component {
    constructor(props) {
      super(props);
      this.store = new Store(props);
      this.handleUpdateCell = this.handleUpdateCell.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.store.set(nextProps.data);
    }

    handleUpdateCell(rowId, dataField, newValue) {
      const { cellEdit } = this.props;
      // handle cell editing internal
      if (!cellEdit.onUpdate) {
        this.store.edit(rowId, dataField, newValue);
        return true;
      }

      // handle cell editing external
      const aPromise = cellEdit.onUpdate(rowId, dataField, newValue);
      if (_.isDefined(aPromise) && aPromise !== false) { // TODO: should be a promise here
        aPromise.then((result = true) => {
          const response = result === true ? {} : result;
          if (_.isObject(response)) {
            const { value } = response;
            this.store.edit(rowId, dataField, value || newValue);
            this.table.completeEditing();
          }
        }).catch((e) => {
          this.table.updateEditingWithErr(e.message);
        });
      }
      return false;
    }

    renderCellEdit(elem) {
      return (
        <CellEditWrapper
          keyField={ this.props.keyField }
          cellEdit={ this.props.cellEdit }
          ref={ node => this.table = node }
          elem={ elem }
          onUpdateCell={ this.handleUpdateCell }
        />
      );
    }

    render() {
      const baseProps = {
        ...this.props,
        store: this.store
      };

      let element = React.createElement(Base, baseProps);
      if (this.props.cellEdit) {
        element = this.renderCellEdit(element);
      }
      return element;
    }
  }
  return StatefulComponent;
};

export default withStateful;
