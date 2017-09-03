/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';
import Store from './store/base';

const withStateful = (Base) => {
  class StatefulComponent extends Component {
    constructor(props) {
      super(props);
      this.store = new Store(props);
    }

    render() {
      const { props } = this;
      return <Base { ...props } store={ this.store } />;
    }
  }
  return StatefulComponent;
};

export default withStateful;
