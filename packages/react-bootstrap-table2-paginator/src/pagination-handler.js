/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import pageResolver from './page-resolver';

export default WrappedComponent =>
  (class PaginationHandler extends pageResolver(Component) {
    constructor(props) {
      super(props);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);
      this.state = this.initialState();
    }

    // eslint-disable-next-line camelcase, react/sort-comp
    UNSAFE_componentWillReceiveProps(nextProps) {
      const { dataSize, currSizePerPage } = nextProps;
      if (currSizePerPage !== this.props.currSizePerPage || dataSize !== this.props.dataSize) {
        const totalPages = this.calculateTotalPage(currSizePerPage, dataSize);
        const lastPage = this.calculateLastPage(totalPages);
        this.setState({ totalPages, lastPage });
      }
    }

    handleChangeSizePerPage(sizePerPage) {
      const { currSizePerPage, onSizePerPageChange } = this.props;
      const selectedSize = typeof sizePerPage === 'string' ? parseInt(sizePerPage, 10) : sizePerPage;
      let { currPage } = this.props;
      if (selectedSize !== currSizePerPage) {
        const newTotalPages = this.calculateTotalPage(selectedSize);
        const newLastPage = this.calculateLastPage(newTotalPages);
        if (currPage > newLastPage) currPage = newLastPage;
        onSizePerPageChange(selectedSize, currPage);
      }
    }

    handleChangePage(newPage) {
      let page;
      const {
        currPage,
        pageStartIndex,
        prePageText,
        nextPageText,
        lastPageText,
        firstPageText,
        onPageChange
      } = this.props;
      const { lastPage } = this.state;

      if (newPage === prePageText) {
        page = this.backToPrevPage();
      } else if (newPage === nextPageText) {
        page = (currPage + 1) > lastPage ? lastPage : currPage + 1;
      } else if (newPage === lastPageText) {
        page = lastPage;
      } else if (newPage === firstPageText) {
        page = pageStartIndex;
      } else {
        page = parseInt(newPage, 10);
      }
      if (page !== currPage) {
        onPageChange(page);
      }
    }

    render() {
      return (
        <WrappedComponent
          { ...this.props }
          lastPage={ this.state.lastPage }
          totalPages={ this.state.totalPages }
          onPageChange={ this.handleChangePage }
          onSizePerPageChange={ this.handleChangeSizePerPage }
        />
      );
    }
  });

