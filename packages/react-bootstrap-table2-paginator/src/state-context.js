/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */
/* eslint camelcase: 0 */
import React from 'react';
import EventEmitter from 'events';
import Const from './const';
import { alignPage } from './page';

const StateContext = React.createContext();

class StateProvider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleDataSizeChange = this.handleDataSizeChange.bind(this);
    this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);

    let currPage;
    let currSizePerPage;
    const { options } = props.pagination;
    const sizePerPageList = options.sizePerPageList || Const.SIZE_PER_PAGE_LIST;

    // initialize current page
    if (typeof options.page !== 'undefined') {
      currPage = options.page;
    } else if (typeof options.pageStartIndex !== 'undefined') {
      currPage = options.pageStartIndex;
    } else {
      currPage = Const.PAGE_START_INDEX;
    }

    // initialize current sizePerPage
    if (typeof options.sizePerPage !== 'undefined') {
      currSizePerPage = options.sizePerPage;
    } else if (typeof sizePerPageList[0] === 'object') {
      currSizePerPage = sizePerPageList[0].value;
    } else {
      currSizePerPage = sizePerPageList[0];
    }

    this.currPage = currPage;
    this.dataSize = options.totalSize;
    this.currSizePerPage = currSizePerPage;
    this.dataChangeListener = new EventEmitter();
    this.dataChangeListener.on('filterChanged', this.handleDataSizeChange);
  }

  getPaginationProps = () => {
    const { pagination: { options }, bootstrap4, tableId } = this.props;
    const { currPage, currSizePerPage, dataSize } = this;
    const withFirstAndLast = typeof options.withFirstAndLast === 'undefined' ?
      Const.With_FIRST_AND_LAST : options.withFirstAndLast;
    const alwaysShowAllBtns = typeof options.alwaysShowAllBtns === 'undefined' ?
      Const.SHOW_ALL_PAGE_BTNS : options.alwaysShowAllBtns;
    const hideSizePerPage = typeof options.hideSizePerPage === 'undefined' ?
      Const.HIDE_SIZE_PER_PAGE : options.hideSizePerPage;
    const hidePageListOnlyOnePage = typeof options.hidePageListOnlyOnePage === 'undefined' ?
      Const.HIDE_PAGE_LIST_ONLY_ONE_PAGE : options.hidePageListOnlyOnePage;
    const pageStartIndex = typeof options.pageStartIndex === 'undefined' ?
      Const.PAGE_START_INDEX : options.pageStartIndex;
    return {
      ...options,
      bootstrap4,
      tableId,
      page: currPage,
      sizePerPage: currSizePerPage,
      pageStartIndex,
      hidePageListOnlyOnePage,
      hideSizePerPage,
      alwaysShowAllBtns,
      withFirstAndLast,
      dataSize,
      sizePerPageList: options.sizePerPageList || Const.SIZE_PER_PAGE_LIST,
      paginationSize: options.paginationSize || Const.PAGINATION_SIZE,
      showTotal: options.showTotal,
      pageListRenderer: options.pageListRenderer,
      pageButtonRenderer: options.pageButtonRenderer,
      sizePerPageRenderer: options.sizePerPageRenderer,
      paginationTotalRenderer: options.paginationTotalRenderer,
      sizePerPageOptionRenderer: options.sizePerPageOptionRenderer,
      firstPageText: options.firstPageText || Const.FIRST_PAGE_TEXT,
      prePageText: options.prePageText || Const.PRE_PAGE_TEXT,
      nextPageText: options.nextPageText || Const.NEXT_PAGE_TEXT,
      lastPageText: options.lastPageText || Const.LAST_PAGE_TEXT,
      prePageTitle: options.prePageTitle || Const.PRE_PAGE_TITLE,
      nextPageTitle: options.nextPageTitle || Const.NEXT_PAGE_TITLE,
      firstPageTitle: options.firstPageTitle || Const.FIRST_PAGE_TITLE,
      lastPageTitle: options.lastPageTitle || Const.LAST_PAGE_TITLE,
      onPageChange: this.handleChangePage,
      onSizePerPageChange: this.handleChangeSizePerPage
    };
  }

  setPaginationRemoteEmitter = (remoteEmitter) => {
    this.remoteEmitter = remoteEmitter;
  }

  getPaginationRemoteEmitter = () => this.remoteEmitter || this.props.remoteEmitter;

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { custom } = nextProps.pagination.options;

    // user should align the page when the page is not fit to the data size when remote enable
    if (this.isRemotePagination() || custom) {
      if (typeof nextProps.pagination.options.page !== 'undefined') {
        this.currPage = nextProps.pagination.options.page;
      }
      if (typeof nextProps.pagination.options.sizePerPage !== 'undefined') {
        this.currSizePerPage = nextProps.pagination.options.sizePerPage;
      }
      if (typeof nextProps.pagination.options.totalSize !== 'undefined') {
        this.dataSize = nextProps.pagination.options.totalSize;
      }
    }
  }

  isRemotePagination = () => {
    const e = {};
    this.remoteEmitter.emit('isRemotePagination', e);
    return e.result;
  };

  handleDataSizeChange(newDataSize) {
    const { pagination: { options } } = this.props;
    const pageStartIndex = typeof options.pageStartIndex === 'undefined' ?
      Const.PAGE_START_INDEX : options.pageStartIndex;
    this.currPage = alignPage(
      newDataSize,
      this.dataSize,
      this.currPage,
      this.currSizePerPage,
      pageStartIndex
    );
    this.dataSize = newDataSize;
    this.forceUpdate();
  }

  handleChangePage(currPage) {
    const { currSizePerPage } = this;
    const { pagination: { options } } = this.props;

    if (options.onPageChange) {
      options.onPageChange(currPage, currSizePerPage);
    }

    this.currPage = currPage;

    if (this.isRemotePagination()) {
      this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
      return;
    }
    this.forceUpdate();
  }

  handleChangeSizePerPage(currSizePerPage, currPage) {
    const { pagination: { options } } = this.props;

    if (options.onSizePerPageChange) {
      options.onSizePerPageChange(currSizePerPage, currPage);
    }

    this.currPage = currPage;
    this.currSizePerPage = currSizePerPage;

    if (this.isRemotePagination()) {
      this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
      return;
    }
    this.forceUpdate();
  }

  render() {
    const paginationProps = this.getPaginationProps();
    const pagination = {
      ...this.props.pagination,
      options: paginationProps
    };

    return (
      <StateContext.Provider
        value={ {
          paginationProps,
          paginationTableProps: {
            pagination,
            setPaginationRemoteEmitter: this.setPaginationRemoteEmitter,
            dataChangeListener: this.dataChangeListener
          }
        } }
      >
        { this.props.children }
      </StateContext.Provider>
    );
  }
}

export default () => ({
  Provider: StateProvider,
  Consumer: StateContext.Consumer
});
