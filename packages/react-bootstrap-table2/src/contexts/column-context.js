/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import PropTypes from 'prop-types';

export default () => {
  const ColumnManagementContext = React.createContext();

  class ColumnManagementProvider extends React.Component {
    static propTypes = {
      columns: PropTypes.array.isRequired,
      toggles: PropTypes.object
    }

    static defaultProps = {
      toggles: null
    }

    render() {
      let toggleColumn;
      const { columns, toggles } = this.props;
      if (toggles) {
        toggleColumn = columns.filter(column => toggles[column.dataField]);
      } else {
        toggleColumn = columns.filter(column => !column.hidden);
      }
      return (
        <ColumnManagementContext.Provider value={ { columns: toggleColumn } }>
          { this.props.children }
        </ColumnManagementContext.Provider>
      );
    }
  }

  return {
    Provider: ColumnManagementProvider,
    Consumer: ColumnManagementContext.Consumer
  };
};
