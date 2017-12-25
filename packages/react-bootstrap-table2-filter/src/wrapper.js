import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filters } from './filter';
import { LIKE } from './comparison';

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
      this.state = { currFilters: {}, isDataChanged: false };
      this.onFilter = this.onFilter.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      // consider to use lodash.isEqual
      if (JSON.stringify(this.state.currFilters) !== JSON.stringify(nextProps.store.filters)) {
        this.setState(() => ({ isDataChanged: true, currFilters: nextProps.store.filters }));
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
        const { comparator = LIKE } = filter.props;
        currFilters[dataField] = { filterVal, filterType, comparator };
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
