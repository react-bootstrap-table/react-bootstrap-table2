import _ from '../utils';

export default ExtendBase =>
  class RemoteResolver extends ExtendBase {
    getNewestState = (state = {}) => {
      let sortOrder;
      let sortField;
      let page;
      let sizePerPage;
      let filters = {};

      if (this.sortContext) {
        sortOrder = this.sortContext.state.sortOrder;
        sortField = this.sortContext.state.sortColumn ?
          this.sortContext.state.sortColumn.dataField :
          null;
      }

      if (this.filterContext) {
        filters = this.filterContext.currFilters;
      }

      if (this.paginationContext) {
        page = this.paginationContext.currPage;
        sizePerPage = this.paginationContext.currSizePerPage;
      }

      return {
        sortOrder,
        sortField,
        filters,
        page,
        sizePerPage,
        ...state,
        data: this.props.data
      };
    }

    isRemotePagination = () => {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.pagination);
    }

    isRemoteFiltering = () => {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.filter) || this.isRemotePagination();
    }

    isRemoteSort = () => {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.sort) || this.isRemotePagination();
    }

    isRemoteCellEdit = () => {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.cellEdit);
    }

    handleRemotePageChange = (page, sizePerPage) => {
      this.props.onTableChange('pagination', this.getNewestState({ page, sizePerPage }));
    }

    handleRemoteFilterChange = (filters) => {
      const newState = { filters };
      if (this.isRemotePagination()) {
        const options = this.props.pagination.options || {};
        newState.page = _.isDefined(options.pageStartIndex) ? options.pageStartIndex : 1;
      }
      this.props.onTableChange('filter', this.getNewestState(newState));
    }

    handleSortChange = (sortField, sortOrder) => {
      this.props.onTableChange('sort', this.getNewestState({ sortField, sortOrder }));
    }

    handleCellChange = (rowId, dataField, newValue) => {
      const cellEdit = { rowId, dataField, newValue };
      this.props.onTableChange('cellEdit', this.getNewestState({ cellEdit }));
    }
  };
