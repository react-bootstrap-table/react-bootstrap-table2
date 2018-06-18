/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
import React from 'react';

const ToolkitContext = React.createContext();

class ToolkitProvider extends React.Component {
  constructor(props) {
    super(props);
    this.test = false;
    this.searchProps = {
      onSearch: this.onSearch.bind(this),
      searchText: ''
    };
  }

  onSearch(searchText) {
    this.searchProps = {
      ...this.searchProps,
      searchText
    };
    this.forceUpdate();
  }

  render() {
    return (
      <ToolkitContext.Provider value={ {
        searchProps: this.searchProps
      } }
      >
        { this.props.children }
      </ToolkitContext.Provider>
    );
  }
}

export default {
  Provider: ToolkitProvider,
  Consumer: ToolkitContext.Consumer
};
