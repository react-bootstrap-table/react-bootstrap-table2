import React from 'react';
import PropTypes from 'prop-types';
import ToolkitContext from './context';

const ToolkitProvider = props => (
  <ToolkitContext.Provider { ...props }>
    <ToolkitContext.Consumer>
      {
        toolkitProps => props.children(toolkitProps)
      }
    </ToolkitContext.Consumer>
  </ToolkitContext.Provider>
);

ToolkitProvider.propTypes = {
  children: PropTypes.func.isRequired
};

export default ToolkitProvider;
