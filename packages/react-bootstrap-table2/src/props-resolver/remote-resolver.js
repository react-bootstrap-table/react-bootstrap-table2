import EventEmitter from 'events';
import _ from '../utils';

export default ExtendBase =>
  class RemoteResolver extends ExtendBase {
    constructor(props) {
      super(props);
      this.remoteEmitter = new EventEmitter();
      this.remoteEmitter.on('paginationChange', this.handleRemotePageChange);
      this.remoteEmitter.on('isRemotePagination', this.isRemotePagination);
    }

    getNewestState = (state = {}) => {
      let sortOrder;
      let sortField;
      let page;
      let sizePerPage;
      let searchText;
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

      if (this.searchContext) {
        searchText = this.props.search.searchText;
      }

      return {
        sortOrder,
        sortField,
        filters,
        page,
        sizePerPage,
        searchText,
        ...state,
        data: this.props.data
      };
    }

    isRemoteSearch = () => {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.search) || this.isRemotePagination();
    }

    isRemotePagination = (e = {}) => {
      const { remote } = this.props;
      e.result = (remote === true || (_.isObject(remote) && remote.pagination));
      return e.result;
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

    handleRemoteSortChange = (sortField, sortOrder) => {
      this.props.onTableChange('sort', this.getNewestState({ sortField, sortOrder }));
    }

    handleRemoteCellChange = (rowId, dataField, newValue) => {
      const cellEdit = { rowId, dataField, newValue };
      this.props.onTableChange('cellEdit', this.getNewestState({ cellEdit }));
    }

    handleRemoteSearchChange = (searchText) => {
      this.props.onTableChange('search', this.getNewestState({ searchText }));
    }
  };
