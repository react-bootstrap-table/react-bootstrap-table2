/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';
import Store from './store/base';

const withStateful = (Base) => {
  class StatefulComponent extends Component {
    constructor(props) {
      super(props);
      this.store = new Store(props);
      this.edit = this.edit.bind(this);
    }

    edit(rowId, dataField, newValue) {
      this.store.edit(rowId, dataField, newValue);
    }

    render() {
      const { props } = this;
      const newProps = { ...props };
      if (newProps.cellEdit && !newProps.cellEdit.onEditing) {
        newProps.cellEdit.onEditing = this.edit;
      }
      return <Base { ...newProps } store={ this.store } />;
    }
  }
  return StatefulComponent;
};

export default withStateful;
