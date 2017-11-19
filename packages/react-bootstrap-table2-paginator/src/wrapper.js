/* eslint react/prop-types: 0 */
/* eslint arrow-body-style: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Const from './const';

const wrapperFactory = baseElement =>
  class PaginationWrapper extends Component {
    static propTypes = {
      store: PropTypes.object.isRequired
    }

    constructor(props) {
      super(props);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);

      const options = props.pagination.options || {};
      const currPage = options.pageStartIndex || Const.PAGE_START_INDEX;
      const sizePerPageList = options.sizePerPageList || Const.SIZE_PER_PAGE_LIST;
      const currSizePerPage = typeof sizePerPageList[0] === 'object' ? sizePerPageList[0].value : sizePerPageList[0];
      this.state = { currPage, currSizePerPage };
    }

    handleChangePage(currPage) {
      const { pagination: { options } } = this.props;
      if (options.onPageChange) {
        options.onPageChange(currPage, this.state.currSizePerPage);
      }
      this.setState(() => {
        return {
          currPage
        };
      });
    }

    handleChangeSizePerPage(currSizePerPage, currPage) {
      const { pagination: { options } } = this.props;
      if (options.onSizePerPageChange) {
        options.onSizePerPageChange(currSizePerPage, currPage);
      }
      this.setState(() => {
        return {
          currPage,
          currSizePerPage
        };
      });
    }

    render() {
      const { pagination: { Pagination, options }, store } = this.props;
      const { currPage, currSizePerPage } = this.state;
      const withFirstAndLast = typeof options.withFirstAndLast === 'undefined' ?
        Const.With_FIRST_AND_LAST : options.withFirstAndLast;
      const alwaysShowAllBtns = typeof options.alwaysShowAllBtns === 'undefined' ?
        Const.SHOW_ALL_PAGE_BTNS : options.alwaysShowAllBtns;
      const hideSizePerPage = typeof options.hideSizePerPage === 'undefined' ?
        Const.HIDE_SIZE_PER_PAGE : options.hideSizePerPage;
      const hidePageListOnlyOnePage = typeof options.hidePageListOnlyOnePage === 'undefined' ?
        Const.HIDE_PAGE_LIST_ONLY_ONE_PAGE : options.hidePageListOnlyOnePage;

      const base = baseElement({
        ...this.props,
        key: 'table',
        data: store.getByCurrPage(currPage, currSizePerPage)
      });

      return [
        base,
        <Pagination
          key="pagination"
          dataSize={ this.props.store.getDataSize() }
          currPage={ currPage }
          currSizePerPage={ currSizePerPage }
          onPageChange={ this.handleChangePage }
          onSizePerPageChange={ this.handleChangeSizePerPage }
          sizePerPageList={ options.sizePerPageList || Const.SIZE_PER_PAGE_LIST }
          paginationSize={ options.paginationSize || Const.PAGINATION_SIZE }
          pageStartIndex={ options.pageStartIndex || Const.PAGE_START_INDEX }
          withFirstAndLast={ withFirstAndLast }
          alwaysShowAllBtns={ alwaysShowAllBtns }
          hideSizePerPage={ hideSizePerPage }
          hidePageListOnlyOnePage={ hidePageListOnlyOnePage }
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

export default wrapperFactory;
