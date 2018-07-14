
import React from 'react';
import PropTypes from 'prop-types';
import statelessDrcorator from './statelessOp';

import createContext from './src/search/context';

const ToolkitContext = React.createContext();

class ToolkitProvider extends statelessDrcorator(React.Component) {
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
    ]),
    exportCSV: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        fileName: PropTypes.string,
        separator: PropTypes.string,
        ignoreHeader: PropTypes.bool,
        noAutoBOM: PropTypes.bool
      })
    ])
  }

  static defaultProps = {
    search: false,
    exportCSV: false
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
        csvProps: {
          onExport: this.handleExportCSV
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
