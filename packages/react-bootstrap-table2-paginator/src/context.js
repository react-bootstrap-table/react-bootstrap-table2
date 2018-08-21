/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import Const from './const';
import { BootstrapContext } from './bootstrap';
import Pagination from './pagination';
import { getByCurrPage, alignPage } from './page';

export default (
  isRemotePagination,
  handleRemotePageChange
) => {
  const PaginationContext = React.createContext();

  class PaginationProvider extends React.Component {
    static propTypes = {
      data: PropTypes.array.isRequired
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

      this.currPage = currPage;
      this.currSizePerPage = currSizePerPage;
    }

    componentWillReceiveProps(nextProps) {
      let needNewState = false;
      let { currPage } = this;
      const { currSizePerPage } = this;
      const { onPageChange } = nextProps.pagination.options;

      const pageStartIndex = typeof nextProps.pagination.options.pageStartIndex !== 'undefined' ?
        nextProps.pagination.options.pageStartIndex : Const.PAGE_START_INDEX;

      // user should align the page when the page is not fit to the data size when remote enable
      if (!isRemotePagination()) {
        const newPage = alignPage(nextProps.data, currPage, currSizePerPage, pageStartIndex);
        if (currPage !== newPage) {
          currPage = newPage;
          needNewState = true;
        }
      }

      if (needNewState) {
        if (onPageChange) {
          onPageChange(currPage, currSizePerPage);
        }
        this.currPage = currPage;
        this.currSizePerPage = currSizePerPage;
      }
    }

    handleChangePage(currPage) {
      const { currSizePerPage } = this;
      const { pagination: { options } } = this.props;

      if (options.onPageChange) {
        options.onPageChange(currPage, currSizePerPage);
      }

      this.currPage = currPage;

      if (isRemotePagination()) {
        handleRemotePageChange(currPage, currSizePerPage);
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

      if (isRemotePagination()) {
        handleRemotePageChange(currPage, currSizePerPage);
        return;
      }
      this.forceUpdate();
    }

    render() {
      let { data } = this.props;
      const { pagination: { options }, bootstrap4 } = this.props;
      const { currPage, currSizePerPage } = this;
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

      data = isRemotePagination() ?
        data :
        getByCurrPage(
          data,
          currPage,
          currSizePerPage,
          pageStartIndex
        );

      return (
        <PaginationContext.Provider value={ { data } }>
          { this.props.children }
          <BootstrapContext.Provider value={ { bootstrap4 } }>
            <Pagination
              key="pagination"
              dataSize={ options.totalSize || this.props.data.length }
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
          </BootstrapContext.Provider>
        </PaginationContext.Provider>
      );
    }
  }

  return {
    Provider: PaginationProvider,
    Consumer: PaginationContext.Consumer
  };
};
