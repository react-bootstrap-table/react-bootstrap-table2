import React, { Component } from 'react';
import PropTypes from 'prop-types';

import storeBase from './store/base';

class BootstrapTable extends storeBase(Component) {
  render() {
    return (
      <ul>
        {
          this.props.data.map(d => <li>{ d }</li>)
        }
      </ul>
    );
  }
}

BootstrapTable.propTypes = {
  data: PropTypes.array
};

BootstrapTable.defaultProps = {
  data: []
};

export default BootstrapTable;
