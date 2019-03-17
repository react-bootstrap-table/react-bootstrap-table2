/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import { filters } from './filter';
import { LIKE, EQ } from './comparison';
import { FILTER_TYPE } from './const';

export default (
  _,
  isRemoteFiltering,
  handleFilterChange
) => {
  const FilterContext = React.createContext();

  class FilterProvider extends React.Component {
    static propTypes = {
      data: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      dataChangeListener: PropTypes.object
    }

    constructor(props) {
      super(props);
      this.currFilters = {};
      this.onFilter = this.onFilter.bind(this);
      this.doFilter = this.doFilter.bind(this);
      this.onExternalFilter = this.onExternalFilter.bind(this);
      this.data = props.data;
      this.isEmitDataChange = false;
    }

    componentDidMount() {
      if (isRemoteFiltering() && Object.keys(this.currFilters).length > 0) {
        handleFilterChange(this.currFilters);
      }
    }

    componentWillReceiveProps(nextProps) {
      // let nextData = nextProps.data;
      if (!isRemoteFiltering() && !_.isEqual(nextProps.data, this.data)) {
        this.doFilter(nextProps, undefined, this.isEmitDataChange);
      } else {
        this.data = nextProps.data;
      }
    }

    onFilter(column, filterType, initialize = false) {
      return (filterVal) => {
        // watch out here if migration to context API, #334
        const currFilters = Object.assign({}, this.currFilters);
        const { dataField, filter } = column;

        const needClearFilters =
          !_.isDefined(filterVal) ||
          filterVal === '' ||
          filterVal.length === 0;

        if (needClearFilters) {
          delete currFilters[dataField];
        } else {
          // select default comparator is EQ, others are LIKE
          const {
            comparator = (filterType === FILTER_TYPE.SELECT ? EQ : LIKE),
            caseSensitive = false
          } = filter.props;
          currFilters[dataField] = { filterVal, filterType, comparator, caseSensitive };
        }

        this.currFilters = currFilters;

        if (isRemoteFiltering()) {
          if (!initialize) {
            handleFilterChange(this.currFilters);
          }
          return;
        }

        let result;
        if (filter.props.onFilter) {
          result = filter.props.onFilter(filterVal);
        }
        this.doFilter(this.props, result);
      };
    }

    onExternalFilter(column, filterType) {
      return (value) => {
        this.onFilter(column, filterType)(value);
      };
    }

    getFiltered() {
      return this.data;
    }

    doFilter(props, customResult, ignoreEmitDataChange = false) {
      let result = customResult;

      const { dataChangeListener, data, columns } = props;
      result = result || filters(data, columns, _)(this.currFilters);
      this.data = result;
      if (dataChangeListener && !ignoreEmitDataChange) {
        this.isEmitDataChange = true;
        dataChangeListener.emit('filterChanged', result.length);
      } else {
        this.isEmitDataChange = false;
        this.forceUpdate();
      }
    }

    render() {
      return (
        <FilterContext.Provider value={ {
          data: this.data,
          onFilter: this.onFilter,
          onExternalFilter: this.onExternalFilter
        } }
        >
          { this.props.children }
        </FilterContext.Provider>
      );
    }
  }

  return {
    Provider: FilterProvider,
    Consumer: FilterContext.Consumer
  };
};
