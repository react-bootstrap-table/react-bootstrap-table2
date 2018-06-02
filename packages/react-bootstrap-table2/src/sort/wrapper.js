/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import remoteResolver from '../props-resolver/remote-resolver';

export default Base =>
  class SortWrapper extends remoteResolver(Component) {
    static propTypes = {
      store: PropTypes.object.isRequired
    }

    constructor(props) {
      super(props);
      this.handleSort = this.handleSort.bind(this);
    }

    componentWillMount() {
      const { columns, defaultSorted, defaultSortDirection, store } = this.props;
      // defaultSorted is an array, it's ready to use as multi / single sort
      // when we start to support multi sort, please update following code to use array.forEach
      if (defaultSorted && defaultSorted.length > 0) {
        const dataField = defaultSorted[0].dataField;
        const order = defaultSorted[0].order;
        const column = columns.filter(col => col.dataField === dataField);
        if (column.length > 0) {
          store.setSort(column[0], order, defaultSortDirection);

          if (column[0].onSort) {
            column[0].onSort(store.sortField, store.sortOrder);
          }

          if (this.isRemoteSort() || this.isRemotePagination()) {
            this.handleSortChange();
          } else {
            store.sortBy(column[0]);
          }
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!this.isRemoteSort() && !this.isRemotePagination()) {
        let sortedColumn;
        for (let i = 0; i < nextProps.columns.length; i += 1) {
          if (nextProps.columns[i].dataField === nextProps.store.sortField) {
            sortedColumn = nextProps.columns[i];
            break;
          }
        }
        if (sortedColumn && sortedColumn.sort) {
          nextProps.store.sortBy(sortedColumn);
        }
      }
    }

    handleSort(column) {
      const { store } = this.props;
      store.setSort(column, undefined, this.props.defaultSortDirection);

      if (column.onSort) {
        column.onSort(store.sortField, store.sortOrder);
      }

      if (this.isRemoteSort() || this.isRemotePagination()) {
        this.handleSortChange();
      } else {
        store.sortBy(column);
        this.forceUpdate();
      }
    }

    render() {
      return (
        <Base
          { ...this.props }
          onSort={ this.handleSort }
          data={ this.props.store.data }
        />
      );
    }
  };
