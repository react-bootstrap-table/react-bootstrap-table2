import { Component } from 'react';
import PropTypes from 'prop-types';
import { filters } from './filter';

export default class FilterWrapper extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    baseElement: PropTypes.func.isRequired,
    _: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { currFilters: {}, isDataChanged: false };
    this.onFilter = this.onFilter.bind(this);
  }

  componentWillReceiveProps() {
    this.setState(() => ({ isDataChanged: false }));
  }

  onFilter(column, filterVal, filterType) {
    const { store, columns, _ } = this.props;
    const { currFilters } = this.state;
    const { dataField, filter } = column;

    if (!_.isDefined(filterVal) || filterVal === '') {
      delete currFilters[dataField];
    } else {
      const { comparator } = filter.props;
      currFilters[dataField] = { filterVal, filterType, comparator };
    }

    store.filteredData = filters(store, columns, _)(currFilters);
    store.filtering = Object.keys(currFilters).length > 0;

    this.setState(() => ({ currFilters, isDataChanged: true }));
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
