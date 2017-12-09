/* eslint arrow-body-style: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
import { Component } from 'react';
import PropTypes from 'prop-types';

import { paginationElement } from '../table-factory';

class SortWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillMount() {
    const { columns, defaultSorted, store } = this.props;
    // defaultSorted is an array, it's ready to use as multi / single sort
    // when we start to support multi sort, please update following code to use array.forEach
    if (defaultSorted && defaultSorted.length > 0) {
      const dataField = defaultSorted[0].dataField;
      const order = defaultSorted[0].order;
      const column = columns.filter(col => col.dataField === dataField);
      if (column.length > 0) {
        store.sortBy(column[0], order);
      }
    }
  }

  handleSort(column) {
    const { store } = this.props;
    store.sortBy(column);

    this.table.setState({ data: store.data });
  }

  render() {
    return paginationElement({
      ...this.props,
      ref: node => this.table = node,
      onSort: this.handleSort,
      data: this.props.store.data
    });
  }
}

SortWrapper.propTypes = {
  store: PropTypes.object.isRequired
};

export default SortWrapper;
