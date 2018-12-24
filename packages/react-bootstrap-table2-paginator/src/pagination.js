/* eslint react/require-default-props: 0 */
/* eslint arrow-body-style: 0 */
import cs from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pageResolver from './page-resolver';
import paginationHandler from './pagination-handler';
import { SizePerPageDropdownAdapter } from './size-per-page-dropdown-adapter';
import { PaginationListWithAdapter } from './pagination-list-adapter';
import PaginationTotal from './pagination-total';
import Const from './const';

class Pagination extends pageResolver(Component) {
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
    const {
      showTotal,
      dataSize,
      pageListRenderer,
      pageButtonRenderer,
      paginationTotalRenderer,
      hidePageListOnlyOnePage,
      totalPages,
      lastPage,
      onPageChange,
      sizePerPageList,
      currSizePerPage,
      hideSizePerPage,
      sizePerPageRenderer,
      sizePerPageOptionRenderer,
      onSizePerPageChange,
      ...rest
    } = this.props;

    const pages = this.calculatePageStatus(this.calculatePages(totalPages, lastPage), lastPage);
    const [from, to] = this.calculateFromTo();
    const pageListClass = cs(
      'react-bootstrap-table-pagination-list',
      'col-md-6 col-xs-6 col-sm-6 col-lg-6', {
        'react-bootstrap-table-pagination-list-hidden': (hidePageListOnlyOnePage && totalPages === 1)
      });
    return (
      <div className="row react-bootstrap-table-pagination">
        <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
          <SizePerPageDropdownAdapter
            sizePerPageList={ sizePerPageList }
            currSizePerPage={ currSizePerPage }
            hideSizePerPage={ hideSizePerPage }
            sizePerPageRenderer={ sizePerPageRenderer }
            sizePerPageOptionRenderer={ sizePerPageOptionRenderer }
            onSizePerPageChange={ onSizePerPageChange }
          />
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
        {
          pageListRenderer ? pageListRenderer({
            pages,
            onPageChange
          }) : (
            <div className={ pageListClass }>
              <PaginationListWithAdapter
                { ...rest }
                lastPage={ lastPage }
                totalPages={ totalPages }
                pageButtonRenderer={ pageButtonRenderer }
                onPageChange={ onPageChange }
              />
            </div>
          )
        }
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
  pageListRenderer: PropTypes.func,
  pageButtonRenderer: PropTypes.func,
  sizePerPageRenderer: PropTypes.func,
  paginationTotalRenderer: PropTypes.func,
  sizePerPageOptionRenderer: PropTypes.func,
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
  pageListRenderer: null,
  pageButtonRenderer: null,
  sizePerPageRenderer: null,
  paginationTotalRenderer: Const.PAGINATION_TOTAL,
  sizePerPageOptionRenderer: null,
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

export default paginationHandler(Pagination);
