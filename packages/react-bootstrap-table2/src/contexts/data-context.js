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

    getData = (filterProps, sortProps, paginationProps) => {
      if (paginationProps) return paginationProps.data;
      else if (sortProps) return sortProps.data;
      else if (filterProps) return filterProps.data;
      return this.props.data;
    }

    render() {
      return (
        <DataContext.Provider
          value={ {
            data: this.state.data,
            getData: this.getData
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
