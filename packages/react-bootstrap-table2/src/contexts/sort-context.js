/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Const from '../const';

export default (
  dataOperator,
  isRemoteSort,
  handleSortChange
) => {
  const SortContext = React.createContext();

  class SortProvider extends React.Component {
    static propTypes = {
      data: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      children: PropTypes.node.isRequired,
      defaultSorted: PropTypes.arrayOf(PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]).isRequired
      })),
      defaultSortDirection: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC])
    }

    constructor(props) {
      super(props);
      let sortOrder;
      let sortColumn;
      const { columns, defaultSorted, defaultSortDirection } = props;

      if (defaultSorted && defaultSorted.length > 0) {
        const sortField = defaultSorted[0].dataField;
        sortOrder = defaultSorted[0].order || defaultSortDirection;
        const sortColumns = columns.filter(col => col.dataField === sortField);
        if (sortColumns.length > 0) {
          sortColumn = sortColumns[0];

          if (sortColumn.onSort) {
            sortColumn.onSort(sortField, sortOrder);
          }

          if (isRemoteSort()) {
            handleSortChange(sortField, sortOrder);
          }
        }
      }
      this.state = { sortOrder, sortColumn };
    }

    handleSort = (column) => {
      const sortOrder = dataOperator.nextOrder(column, this.state, this.props.defaultSortDirection);

      if (column.onSort) {
        column.onSort(column.dataField, sortOrder);
      }

      if (isRemoteSort()) {
        handleSortChange(column.dataField, sortOrder);
      }
      this.setState(() => ({
        sortOrder,
        sortColumn: column
      }));
    }

    render() {
      let { data } = this.props;
      const { sortOrder, sortColumn } = this.state;
      if (!isRemoteSort() && sortColumn) {
        data = dataOperator.sort(data, sortOrder, sortColumn);
      }

      return (
        <SortContext.Provider
          value={ {
            data,
            sortOrder,
            onSort: this.handleSort,
            sortField: sortColumn ? sortColumn.dataField : null
          } }
        >
          { this.props.children }
        </SortContext.Provider>
      );
    }
  }
  return {
    Provider: SortProvider,
    Consumer: SortContext.Consumer
  };
};
