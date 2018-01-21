/* eslint no-return-assign: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Store from './store';
import withSort from './sort/wrapper';
import withSelection from './row-selection/wrapper';

import remoteResolver from './props-resolver/remote-resolver';
import _ from './utils';

const withDataStore = Base =>
  class BootstrapTableContainer extends remoteResolver(Component) {
    constructor(props) {
      super(props);
      this.store = new Store(props.keyField);
      this.store.data = props.data;
      this.wrapComponents();
    }

    componentWillReceiveProps(nextProps) {
      this.store.setAllData(nextProps.data);
    }

    wrapComponents() {
      this.BaseComponent = Base;
      const { pagination, columns, filter, selectRow, cellEdit } = this.props;
      if (pagination) {
        const { wrapperFactory } = pagination;
        this.BaseComponent = wrapperFactory(this.BaseComponent, {
          remoteResolver
        });
      }

      if (columns.filter(col => col.sort).length > 0) {
        this.BaseComponent = withSort(this.BaseComponent);
      }

      if (filter) {
        const { wrapperFactory } = filter;
        this.BaseComponent = wrapperFactory(this.BaseComponent, {
          _,
          remoteResolver
        });
      }

      if (cellEdit) {
        const { wrapperFactory } = cellEdit;
        this.BaseComponent = wrapperFactory(this.BaseComponent, {
          _,
          remoteResolver
        });
      }

      if (selectRow) {
        this.BaseComponent = withSelection(this.BaseComponent);
      }
    }

    render() {
      const baseProps = {
        ...this.props,
        store: this.store
      };

      return (
        <this.BaseComponent { ...baseProps } />
      );
    }
  };

export default withDataStore;
