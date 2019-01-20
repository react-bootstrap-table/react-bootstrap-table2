
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
    bootstrap4: PropTypes.bool,
    search: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        defaultSearch: PropTypes.string,
        searchFormatted: PropTypes.bool
      })
    ]),
    exportCSV: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        fileName: PropTypes.string,
        separator: PropTypes.string,
        ignoreHeader: PropTypes.bool,
        noAutoBOM: PropTypes.bool,
        exportAll: PropTypes.bool,
        onlyExportSelection: PropTypes.bool
      })
    ])
  }

  static defaultProps = {
    search: false,
    exportCSV: false,
    bootstrap4: false
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: typeof props.search === 'object' ? (props.search.defaultSearch || '') : ''
    };
    this._ = null;
    this.onClear = this.onClear.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setDependencyModules = this.setDependencyModules.bind(this);
  }

  onSearch(searchText) {
    if (searchText !== this.state.searchText) {
      this.setState({ searchText });
    }
  }

  onClear() {
    this.setState({ searchText: '' });
  }

  /**
   * 
   * @param {*} _ 
   * this function will be called only one time when table render
   * react-bootstrap-table-next/src/context/index.js will call this cb for passing the _ module
   * Please consider to extract a common module to handle _ module.
   * this is just a quick fix
   */
  setDependencyModules(_) {
    this._ = _;
  }

  render() {
    const baseProps = {
      keyField: this.props.keyField,
      columns: this.props.columns,
      data: this.props.data,
      bootstrap4: this.props.bootstrap4,
      setDependencyModules: this.setDependencyModules,
      registerExposedAPI: this.registerExposedAPI
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
          searchText: this.state.searchText,
          onSearch: this.onSearch,
          onClear: this.onClear
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
