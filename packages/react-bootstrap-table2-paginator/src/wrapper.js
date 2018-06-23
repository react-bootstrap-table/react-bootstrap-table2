/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Const from './const';
import Pagination from './pagination';
import { getByCurrPage } from './page';

export default (Base, {
  remoteResolver
}) =>
  class PaginationWrapper extends remoteResolver(Component) {
    static propTypes = {
      store: PropTypes.object.isRequired
    }

    constructor(props) {
      super(props);
      this.handleChangePage = this.handleChangePage.bind(this);
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

      this.state = { currPage, currSizePerPage };
      this.saveToStore(currPage, currSizePerPage);
    }

    componentWillReceiveProps(nextProps) {
      let needNewState = false;
      let { currPage, currSizePerPage } = this.state;
      const { page, sizePerPage, pageStartIndex, onPageChange } = nextProps.pagination.options;

      if (typeof page !== 'undefined' && currPage !== page) { // user defined page
        currPage = page;
        needNewState = true;
      } else if (nextProps.isDataChanged) {
        needNewState = true;
      }

      if (typeof currPage === 'undefined') {
        currPage = typeof pageStartIndex !== 'undefined' ? pageStartIndex : Const.PAGE_START_INDEX;
      }

      if (typeof sizePerPage !== 'undefined') {
        currSizePerPage = sizePerPage;
        needNewState = true;
      }

      this.saveToStore(currPage, currSizePerPage);

      if (needNewState) {
        if (onPageChange) {
          onPageChange(currPage, currSizePerPage);
        }
        this.setState(() => ({ currPage, currSizePerPage }));
      }
    }

    saveToStore(page, sizePerPage) {
      this.props.store.page = page;
      this.props.store.sizePerPage = sizePerPage;
    }

    handleChangePage(currPage) {
      const { currSizePerPage } = this.state;
      const { pagination: { options } } = this.props;
      this.saveToStore(currPage, currSizePerPage);

      if (options.onPageChange) {
        options.onPageChange(currPage, currSizePerPage);
      }
      if (this.isRemotePagination()) {
        this.handleRemotePageChange();
        return;
      }
      this.setState(() => ({ currPage }));
    }

    handleChangeSizePerPage(currSizePerPage, currPage) {
      const { pagination: { options } } = this.props;
      this.saveToStore(currPage, currSizePerPage);

      if (options.onSizePerPageChange) {
        options.onSizePerPageChange(currSizePerPage, currPage);
      }
      if (this.isRemotePagination()) {
        this.handleRemotePageChange();
        return;
      }
      this.setState(() => ({
        currPage,
        currSizePerPage
      }));
    }

    render() {
      const { pagination: { options }, store } = this.props;
      const { currPage, currSizePerPage } = this.state;
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

      const data = this.isRemotePagination() ?
        this.props.data :
        getByCurrPage(store, pageStartIndex);

      return [
        <Base key="table" { ...this.props } data={ data } />,
        <Pagination
          key="pagination"
          dataSize={ options.totalSize || store.data.length }
          currPage={ currPage }
          currSizePerPage={ currSizePerPage }
          onPageChange={ this.handleChangePage }
          onSizePerPageChange={ this.handleChangeSizePerPage }
          sizePerPageList={ options.sizePerPageList || Const.SIZE_PER_PAGE_LIST }
          paginationSize={ options.paginationSize || Const.PAGINATION_SIZE }
          pageStartIndex={ pageStartIndex }
          withFirstAndLast={ withFirstAndLast }
          alwaysShowAllBtns={ alwaysShowAllBtns }
          hideSizePerPage={ hideSizePerPage }
          hidePageListOnlyOnePage={ hidePageListOnlyOnePage }
          showTotal={ options.showTotal }
          paginationTotalRenderer={ options.paginationTotalRenderer }
          firstPageText={ options.firstPageText || Const.FIRST_PAGE_TEXT }
          prePageText={ options.prePageText || Const.PRE_PAGE_TEXT }
          nextPageText={ options.nextPageText || Const.NEXT_PAGE_TEXT }
          lastPageText={ options.lastPageText || Const.LAST_PAGE_TEXT }
          prePageTitle={ options.prePageTitle || Const.PRE_PAGE_TITLE }
          nextPageTitle={ options.nextPageTitle || Const.NEXT_PAGE_TITLE }
          firstPageTitle={ options.firstPageTitle || Const.FIRST_PAGE_TITLE }
          lastPageTitle={ options.lastPageTitle || Const.LAST_PAGE_TITLE }
        />
      ];
    }
  };
