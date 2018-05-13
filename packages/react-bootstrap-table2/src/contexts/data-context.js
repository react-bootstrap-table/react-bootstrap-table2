import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default () => {
  const DataContext = React.createContext();

  class DataProvider extends Component {
    static propTypes = {
      data: PropTypes.array.isRequired,
      children: PropTypes.node.isRequired
    }

    state = { data: this.props.data };

    componentWillReceiveProps(nextProps) {
      this.setState(() => ({ data: nextProps.data }));
    }

    render() {
      return (
        <DataContext.Provider
          value={ {
            data: this.state.data
          } }
        >
          { this.props.children }
        </DataContext.Provider>
      );
    }
  }
  return {
    Provider: DataProvider,
    Consumer: DataContext.Consumer
  };
};
