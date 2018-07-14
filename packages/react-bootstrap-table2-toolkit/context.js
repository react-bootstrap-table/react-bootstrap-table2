
import React from 'react';
import PropTypes from 'prop-types';

import createContext from './src/search/context';

const ToolkitContext = React.createContext();

class ToolkitProvider extends React.Component {
  static propTypes = {
    keyField: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    search: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        searchFormatted: PropTypes.bool
      })
    ])
  }

  static defaultProps = {
    search: null
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchText) {
    this.setState({ searchText });
  }

  render() {
    const baseProps = {
      keyField: this.props.keyField,
      columns: this.props.columns,
      data: this.props.data
    };
    if (this.props.search) {
      baseProps.search = {
        searchContext: createContext(this.props.search),
        searchText: this.state.searchText
      };
    }
    return (
      <ToolkitContext.Provider value={ {
        searchProps: {
          onSearch: this.onSearch
        },
        baseProps
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
