/* eslint react/require-default-props: 0 */
/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pageResolver from './page-resolver';
import SizePerPageDropDown from './size-per-page-dropdown';
import PaginationList from './pagination-list';

class Pagination extends pageResolver(Component) {
  constructor(props) {
    super(props);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);
    this.state = this.initialState();
  }

  componentWillReceiveProps(nextProps) {
    const { dataSize, currSizePerPage } = nextProps;

    if (currSizePerPage !== this.props.currSizePerPage || dataSize !== this.props.dataSize) {
      const totalPages = this.calculateTotalPage(currSizePerPage);
      const lastPage = this.calculateLastPage(totalPages);
      this.setState({ totalPages, lastPage });
    }
  }

  toggleDropDown() {
    const dropdownOpen = !this.state.dropdownOpen;
    this.setState(() => {
      return { dropdownOpen };
    });
  }

  closeDropDown() {
    this.setState(() => {
      return { dropdownOpen: false };
    });
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
    this.closeDropDown();
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
    const { totalPages, lastPage, dropdownOpen: open } = this.state;
    const { sizePerPageList, currSizePerPage } = this.props;
    const pages = this.calculatePageStatus(this.calculatePages(totalPages), lastPage);
    return (
      <div className="row react-bootstrap-table-pagination">
        <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
          {
            sizePerPageList.length > 1 ?
              (
                <SizePerPageDropDown
                  currSizePerPage={ `${currSizePerPage}` }
                  options={ this.calculateSizePerPageStatus() }
                  onSizePerPageChange={ this.handleChangeSizePerPage }
                  onClick={ this.toggleDropDown }
                  onBlur={ this.closeDropDown }
                  open={ open }
                />
              ) : null
          }
        </div>
        <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
          <PaginationList pages={ pages } onPageChange={ this.handleChangePage } />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  dataSize: PropTypes.number.isRequired,
  sizePerPageList: PropTypes.array.isRequired,
  currPage: PropTypes.number.isRequired,
  currSizePerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizePerPageChange: PropTypes.func.isRequired,
  pageStartIndex: PropTypes.number,
  paginationSize: PropTypes.number,
  firstPageText: PropTypes.string,
  prePageText: PropTypes.string,
  nextPageText: PropTypes.string,
  lastPageText: PropTypes.string,
  withFirstAndLast: PropTypes.bool,
  alwaysShowAllBtns: PropTypes.bool
};

export default Pagination;
