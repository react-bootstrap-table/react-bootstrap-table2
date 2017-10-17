/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
/* eslint no-return-assign: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Store from './store/base';
import SortWrapper from './sort/wrapper';
import CellEditWrapper from './cell-edit/wrapper';
import RowSelectionWrapper from './row-selection/wrapper';
import _ from './utils';

const withDataStore = (Base) => {
  return class BootstrapTableContainer extends Component {
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
            this.cellEditWrapper.completeEditing();
          }
        }).catch((e) => {
          this.cellEditWrapper.updateEditingWithErr(e.message);
        });
      }
      return false;
    }

    renderCellEdit(elem) {
      return (
        <CellEditWrapper
          keyField={ this.props.keyField }
          cellEdit={ this.props.cellEdit }
          ref={ node => this.cellEditWrapper = node }
          elem={ elem }
          onUpdateCell={ this.handleUpdateCell }
        />
      );
    }

    renderRowSelection(elem) {
      return (
        <RowSelectionWrapper
          keyField={ this.props.keyField }
          selectRow={ this.props.selectRow }
          store={ this.store }
          elem={ elem }
        />
      );
    }

    renderSort(elem) {
      return (
        <SortWrapper elem={ elem } store={ this.store } />
      );
    }

    render() {
      const baseProps = {
        ...this.props,
        store: this.store
      };

      let element = React.createElement(Base, baseProps);

      // @TODO
      // the logic of checking sort is enable or not should be placed in the props resolver..
      // but currently, I've no idea to refactoring this
      if (this.props.columns.filter(col => col.sort).length > 0) {
        element = this.renderSort(element);
      }

      if (this.props.selectRow) {
        element = this.renderRowSelection(element);
      }

      if (this.props.cellEdit) {
        element = this.renderCellEdit(element);
      }

      return element;
    }
  };
};

export default withDataStore;
