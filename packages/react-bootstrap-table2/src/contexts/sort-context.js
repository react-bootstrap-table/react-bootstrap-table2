
import React from 'react';
import PropTypes from 'prop-types';
import Const from '../const';
import { sort, nextOrder } from '../store/sort';
import remoteResolver from '../props-resolver/remote-resolver';

export default () => {
  const SortContext = React.createContext();

  class SortProvider extends remoteResolver(React.Component) {
    static propTypes = {
      columns: PropTypes.array.isRequired,
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

          if (this.isRemoteSort() || this.isRemotePagination()) {
            this.handleSortChange();
          }
        }
      }
      this.state = { sortOrder, sortColumn };
    }

    handleSort = (column) => {
      const sortOrder = nextOrder(column, this.state, this.props.defaultSortDirection);

      if (column.onSort) {
        column.onSort(column.dataField, sortOrder);
      }

      if (this.isRemoteSort() || this.isRemotePagination()) {
        this.handleSortChange();
      } else {
        this.setState(() => ({
          sortOrder,
          sortColumn: column
        }));
      }
    }

    render() {
      let { data } = this.props;
      const { sortOrder, sortColumn } = this.state;
      if (!this.isRemoteSort() && !this.isRemotePagination() && sortColumn) {
        data = sort(data, sortOrder, sortColumn);
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
