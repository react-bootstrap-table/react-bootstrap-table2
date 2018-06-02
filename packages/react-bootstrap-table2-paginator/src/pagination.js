/* eslint react/require-default-props: 0 */
/* eslint arrow-body-style: 0 */
import cs from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pageResolver from './page-resolver';
import SizePerPageDropDown from './size-per-page-dropdown';
import PaginationList from './pagination-list';
import PaginationTotal from './pagination-total';
import Const from './const';

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
      const totalPages = this.calculateTotalPage(currSizePerPage, dataSize);
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

  defaultTotal = (from, to, size) => (
    <PaginationTotal
      from={ from }
      to={ to }
      dataSize={ size }
    />
  );

  setTotal = (from, to, size, total) => {
    if (total && (typeof total === 'function')) {
      return total(from, to, size);
    }

    return this.defaultTotal(from, to, size);
  };

  render() {
    const { totalPages, lastPage, dropdownOpen: open } = this.state;
    const {
      showTotal,
      dataSize,
      paginationTotalRenderer,
      sizePerPageList,
      currSizePerPage,
      hideSizePerPage,
      hidePageListOnlyOnePage
    } = this.props;
    const pages = this.calculatePageStatus(this.calculatePages(totalPages), lastPage);
    const [from, to] = this.calculateFromTo();
    const pageListClass = cs(
      'react-bootstrap-table-pagination-list',
      'col-md-6 col-xs-6 col-sm-6 col-lg-6', {
        'react-bootstrap-table-pagination-list-hidden': (hidePageListOnlyOnePage && totalPages === 1)
      });
    return (
      <div className="row react-bootstrap-table-pagination">
        <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
          {
            sizePerPageList.length > 1 && !hideSizePerPage ?
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
          {
            showTotal ?
              this.setTotal(
                from,
                to,
                dataSize,
                paginationTotalRenderer
              ) : null
          }
        </div>
        <div className={ pageListClass }>
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
  showTotal: PropTypes.bool,
  paginationTotalRenderer: PropTypes.func,
  firstPageText: PropTypes.string,
  prePageText: PropTypes.string,
  nextPageText: PropTypes.string,
  lastPageText: PropTypes.string,
  nextPageTitle: PropTypes.string,
  prePageTitle: PropTypes.string,
  firstPageTitle: PropTypes.string,
  lastPageTitle: PropTypes.string,
  withFirstAndLast: PropTypes.bool,
  alwaysShowAllBtns: PropTypes.bool,
  hideSizePerPage: PropTypes.bool,
  hidePageListOnlyOnePage: PropTypes.bool
};

Pagination.defaultProps = {
  pageStartIndex: Const.PAGE_START_INDEX,
  paginationSize: Const.PAGINATION_SIZE,
  withFirstAndLast: Const.With_FIRST_AND_LAST,
  alwaysShowAllBtns: Const.SHOW_ALL_PAGE_BTNS,
  showTotal: Const.SHOW_TOTAL,
  paginationTotalRenderer: Const.PAGINATION_TOTAL,
  firstPageText: Const.FIRST_PAGE_TEXT,
  prePageText: Const.PRE_PAGE_TEXT,
  nextPageText: Const.NEXT_PAGE_TEXT,
  lastPageText: Const.LAST_PAGE_TEXT,
  sizePerPageList: Const.SIZE_PER_PAGE_LIST,
  nextPageTitle: Const.NEXT_PAGE_TITLE,
  prePageTitle: Const.PRE_PAGE_TITLE,
  firstPageTitle: Const.FIRST_PAGE_TITLE,
  lastPageTitle: Const.LAST_PAGE_TITLE,
  hideSizePerPage: Const.HIDE_SIZE_PER_PAGE,
  hidePageListOnlyOnePage: Const.HIDE_PAGE_LIST_ONLY_ONE_PAGE
};

export default Pagination;
