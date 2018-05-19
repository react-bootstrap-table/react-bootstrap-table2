import _ from '../utils';

export default ExtendBase =>
  class RemoteResolver extends ExtendBase {
    /* eslint class-methods-use-this: 0 */
    getNewestState(state = {}) {
      // const store = this.store || this.props.store;
      // return {
      //   page: store.page,
      //   sizePerPage: store.sizePerPage,
      //   filters: store.filters,
      //   sortField: store.sortField,
      //   sortOrder: store.sortOrder,
      //   data: store.getAllData(),
      //   ...state
      // };
      return { ...state, data: this.props.data };
    }

    isRemotePagination() {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.pagination);
    }

    isRemoteFiltering() {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.filter);
    }

    isRemoteSort = () => {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.sort) || this.isRemotePagination();
    }

    isRemoteCellEdit() {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.cellEdit);
    }

    handleRemotePageChange() {
      this.props.onTableChange('pagination', this.getNewestState());
    }

    handleRemoteFilterChange() {
      const newState = {};
      if (this.isRemotePagination()) {
        const options = this.props.pagination.options || {};
        newState.page = _.isDefined(options.pageStartIndex) ? options.pageStartIndex : 1;
      }
      this.props.onTableChange('filter', this.getNewestState(newState));
    }

    handleSortChange = (sortField, sortOrder) => {
      this.props.onTableChange('sort', this.getNewestState({ sortField, sortOrder }));
    }

    handleCellChange(rowId, dataField, newValue) {
      const cellEdit = { rowId, dataField, newValue };
      this.props.onTableChange('cellEdit', this.getNewestState({ cellEdit }));
    }
  };
