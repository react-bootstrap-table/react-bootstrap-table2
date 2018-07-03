/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const ToolkitContext = React.createContext();

class ToolkitProvider extends React.Component {
  static propTypes = {
    keyField: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired
  }

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
    const { keyField, columns, data } = this.props;
    return (
      <ToolkitContext.Provider value={ {
        searchProps: this.searchProps,
        baseProps: { keyField, columns, data }
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
