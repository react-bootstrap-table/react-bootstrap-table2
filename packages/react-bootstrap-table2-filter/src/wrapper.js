/* eslint react/prop-types: 0 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { filters } from './filter';
import { LIKE } from './comparison';

export default class FilterWrapper extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    baseElement: PropTypes.func.isRequired,
    onRemoteFilterChange: PropTypes.func.isRequired,
    // refactoring later
    _: PropTypes.object.isRequired
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
    const { store, columns, _, onRemoteFilterChange } = this.props;
    const currFilters = Object.assign({}, this.state.currFilters);
    const { dataField, filter } = column;

    if (!_.isDefined(filterVal) || filterVal === '') {
      delete currFilters[dataField];
    } else {
      const { comparator = LIKE } = filter.props;
      currFilters[dataField] = { filterVal, filterType, comparator };
    }
    store.filters = currFilters;

    if (this.isRemote() || this.isPaginationRemote()) {
      onRemoteFilterChange(this.isPaginationRemote());
      // when remote filtering is enable, dont set currFilters state
      // in the componentWillReceiveProps, it's the key point that we can know the filter is changed
      return;
    }

    store.filteredData = filters(store, columns, _)(currFilters);
    this.setState(() => ({ currFilters, isDataChanged: true }));
  }

  // refactoring later
  isRemote() {
    const { remote } = this.props;
    return remote === true || (typeof remote === 'object' && remote.filter);
  }

  // refactoring later
  isPaginationRemote() {
    const { remote } = this.props;
    return remote === true || (typeof remote === 'object' && remote.pagination);
  }

  render() {
    return this.props.baseElement({
      ...this.props,
      key: 'table',
      onFilter: this.onFilter,
      isDataChanged: this.state.isDataChanged
    });
  }
}
