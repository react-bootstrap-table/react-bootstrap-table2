import React from 'react';
import pageResolver from './page-resolver';
import PaginationList from './pagination-list';

export default class PaginationListStandalone extends pageResolver(React.Component) {
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
    const { totalPages, lastPage } = this.state;
    const pages = this.calculatePageStatus(this.calculatePages(totalPages), lastPage);

    return (
      <PaginationList
        pages={ pages }
        onPageChange={ this.handleChangePage }
      />
    );
  }
}
