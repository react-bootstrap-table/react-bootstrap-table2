/* eslint arrow-body-style: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return React.cloneElement(this.props.elem, {
      ref: node => this.table = node,
      onSort: this.handleSort
    });
  }
}

SortWrapper.propTypes = {
  elem: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired
};

export default SortWrapper;
