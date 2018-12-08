import React from 'react';
import PropTypes from 'prop-types';
import createBaseContext from './src/state-context';
import createDataContext from './src/data-context';
import PaginationListStandalone from './src/pagination-list-standalone';

export default (options = {}) => ({
  createContext: createDataContext,
  options
});

const { Provider, Consumer } = createBaseContext();

const CustomizableProvider = props => (
  <Provider { ...props }>
    <Consumer>{ paginationProps => props.children(paginationProps) }</Consumer>
  </Provider>
);

CustomizableProvider.propTypes = {
  children: PropTypes.func.isRequired
};

export const PaginationProvider = CustomizableProvider;
export { PaginationListStandalone };
