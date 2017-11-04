/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pageResolver from './page-resolver';
import PaginationList from './pagination-list';

class Pagination extends pageResolver(Component) {
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.state = this.initialState();
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
      // keepSizePerPageState
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

    // if (keepSizePerPageState) { this.closeDropDown(); }

    if (page !== currPage) {
      onPageChange(page);
    }
  }

  render() {
    const { totalPages, lastPage } = this.state;
    const pages = this.calculatePageStatus(this.calculatePages(totalPages), lastPage);
    return (
      <div className="row react-bootstrap-table-pagination">
        <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
          <PaginationList pages={ pages } onPageChange={ this.handleChangePage } />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  dataSize: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  currSizePerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageStartIndex: PropTypes.number,
  paginationSize: PropTypes.number,
  firstPageText: PropTypes.string,
  prePageText: PropTypes.string,
  nextPageText: PropTypes.string,
  lastPageText: PropTypes.string,
  withFirstAndLast: PropTypes.bool,
  alwaysShowAllBtns: PropTypes.bool,
};

export default Pagination;
