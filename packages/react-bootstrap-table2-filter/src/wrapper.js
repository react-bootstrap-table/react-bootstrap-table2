/* eslint no-param-reassign: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filters } from './filter';
import { LIKE, EQ } from './comparison';
import { FILTER_TYPE } from './const';

export default (Base, {
  _,
  remoteResolver
}) =>
  class FilterWrapper extends remoteResolver(Component) {
    static propTypes = {
      store: PropTypes.object.isRequired,
      columns: PropTypes.array.isRequired
    }

    constructor(props) {
      super(props);
      this.state = { currFilters: {}, isDataChanged: props.isDataChanged || false };
      this.onFilter = this.onFilter.bind(this);
    }

    componentWillReceiveProps({ isDataChanged, store, columns }) {
      // consider to use lodash.isEqual
      const isRemoteFilter = this.isRemoteFiltering() || this.isRemotePagination();
      if (isRemoteFilter ||
        JSON.stringify(this.state.currFilters) !== JSON.stringify(store.filters)) {
        // I think this condition only isRemoteFilter is enough
        store.filteredData = store.getAllData();
        this.setState(() => ({ isDataChanged: true, currFilters: store.filters }));
      } else if (isDataChanged) {
        if (!isRemoteFilter && Object.keys(this.state.currFilters).length > 0) {
          store.filteredData = filters(store, columns, _)(this.state.currFilters);
        }
        this.setState(() => ({ isDataChanged }));
      } else {
        this.setState(() => ({ isDataChanged: false }));
      }
    }

    onFilter(column, filterVal, filterType) {
      const { store, columns } = this.props;
      const currFilters = Object.assign({}, this.state.currFilters);
      const { dataField, filter } = column;

      if (!_.isDefined(filterVal) || filterVal === '') {
        delete currFilters[dataField];
      } else {
        // select default comparator is EQ, others are LIKE
        const {
          comparator = (filterType === FILTER_TYPE.SELECT ? EQ : LIKE),
          caseSensitive = false
        } = filter.props;
        currFilters[dataField] = { filterVal, filterType, comparator, caseSensitive };
      }
      store.filters = currFilters;

      if (this.isRemoteFiltering() || this.isRemotePagination()) {
        this.handleRemoteFilterChange();
        // when remote filtering is enable, dont set currFilters state
        // in the componentWillReceiveProps, 
        // it's the key point that we can know the filter is changed
        return;
      }

      store.filteredData = filters(store, columns, _)(currFilters);
      this.setState(() => ({ currFilters, isDataChanged: true }));
    }

    render() {
      return (
        <Base
          { ...this.props }
          data={ this.props.store.data }
          onFilter={ this.onFilter }
          isDataChanged={ this.state.isDataChanged }
        />
      );
    }
  };
