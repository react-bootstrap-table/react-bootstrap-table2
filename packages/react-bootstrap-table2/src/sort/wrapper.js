/* eslint arrow-body-style: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
import { Component } from 'react';
import PropTypes from 'prop-types';

import { sortableElement } from '../table-factory';

class SortWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(column) {
    const { store } = this.props;
    store.sortBy(column);

    this.table.setState({
      data: store.get()
    });
  }

  render() {
    return sortableElement({
      ...this.props,
      ref: node => this.table = node,
      onSort: this.handleSort
    });
  }
}

SortWrapper.propTypes = {
  store: PropTypes.object.isRequired
};

export default SortWrapper;
