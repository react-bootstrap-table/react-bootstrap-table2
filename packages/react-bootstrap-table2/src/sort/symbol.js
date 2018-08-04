import React from 'react';
import { BootstrapContext } from '../contexts/bootstrap';

const SortSymbol = () => (
  <BootstrapContext.Consumer>
    {
      ({ bootstrap4 }) => (bootstrap4 ? (
        <span className="order-4" />
      ) : (
        <span className="order">
          <span className="dropdown">
            <span className="caret" />
          </span>
          <span className="dropup">
            <span className="caret" />
          </span>
        </span>
      ))
    }
  </BootstrapContext.Consumer>
);

export default SortSymbol;
