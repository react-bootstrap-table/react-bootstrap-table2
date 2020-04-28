/* eslint no-mixed-operators: 0 */
import Const from './const';

export default ExtendBase =>
  class PageResolver extends ExtendBase {
    backToPrevPage() {
      const { currPage, pageStartIndex } = this.props;
      return (currPage - 1) < pageStartIndex ? pageStartIndex : currPage - 1;
    }

    initialState() {
      const totalPages = this.calculateTotalPage();
      const lastPage = this.calculateLastPage(totalPages);
      return { totalPages, lastPage };
    }

    calculateTotalPage(sizePerPage = this.props.currSizePerPage, dataSize = this.props.dataSize) {
      return Math.ceil(dataSize / sizePerPage);
    }

    calculateLastPage(totalPages) {
      const { pageStartIndex } = this.props;
      return pageStartIndex + totalPages - 1;
    }

    calculateFromTo() {
      const {
        dataSize,
        currPage,
        currSizePerPage,
        pageStartIndex
      } = this.props;
      const offset = Math.abs(Const.PAGE_START_INDEX - pageStartIndex);

      let from = ((currPage - pageStartIndex) * currSizePerPage);
      from = dataSize === 0 ? 0 : from + 1;
      let to = Math.min(currSizePerPage * (currPage + offset), dataSize);
      if (to > dataSize) to = dataSize;

      return [from, to];
    }

    calculatePages(
      totalPages,
      lastPage
    ) {
      const {
        currPage,
        paginationSize,
        pageStartIndex,
        withFirstAndLast,
        firstPageText,
        prePageText,
        nextPageText,
        lastPageText,
        alwaysShowAllBtns
      } = this.props;

      let pages = [];
      let endPage = totalPages;
      if (endPage <= 0) return [];

      let startPage = Math.max(currPage - Math.floor(paginationSize / 2), pageStartIndex);
      endPage = startPage + paginationSize - 1;

      if (endPage > lastPage) {
        endPage = lastPage;
        startPage = endPage - paginationSize + 1;
      }

      if (alwaysShowAllBtns) {
        if (withFirstAndLast) {
          pages = [firstPageText, prePageText];
        } else {
          pages = [prePageText];
        }
      }

      if (startPage !== pageStartIndex &&
        totalPages > paginationSize &&
        withFirstAndLast &&
        pages.length === 0
      ) {
        pages = [firstPageText, prePageText];
      } else if (totalPages > 1 && pages.length === 0) {
        pages = [prePageText];
      }

      for (let i = startPage; i <= endPage; i += 1) {
        if (i >= pageStartIndex) pages.push(i);
      }

      if (alwaysShowAllBtns || (endPage <= lastPage && pages.length > 1)) {
        pages.push(nextPageText);
      }
      if ((endPage !== lastPage && withFirstAndLast) || (withFirstAndLast && alwaysShowAllBtns)) {
        pages.push(lastPageText);
      }

      // if ((endPage <= lastPage && pages.length > 1) || alwaysShowAllBtns) {
      //   pages.push(nextPageText);
      // }
      // if (endPage !== lastPage && withFirstAndLast) {
      //   pages.push(lastPageText);
      // }

      return pages;
    }

    calculatePageStatus(pages = [], lastPage, disablePageTitle = false) {
      const {
        currPage,
        pageStartIndex,
        firstPageText,
        prePageText,
        nextPageText,
        lastPageText,
        alwaysShowAllBtns
      } = this.props;
      const isStart = page =>
        (currPage === pageStartIndex && (page === firstPageText || page === prePageText));
      const isEnd = page =>
        (currPage === lastPage && (page === nextPageText || page === lastPageText));

      return pages
        .filter((page) => {
          if (alwaysShowAllBtns) {
            return true;
          }
          return !(isStart(page) || isEnd(page));
        })
        .map((page) => {
          let title;
          const active = page === currPage;
          const disabled = (isStart(page) || isEnd(page));

          if (page === nextPageText) {
            title = this.props.nextPageTitle;
          } else if (page === prePageText) {
            title = this.props.prePageTitle;
          } else if (page === firstPageText) {
            title = this.props.firstPageTitle;
          } else if (page === lastPageText) {
            title = this.props.lastPageTitle;
          } else {
            title = `${page}`;
          }

          const pageResult = { page, active, disabled };
          if (!disablePageTitle) {
            pageResult.title = title;
          }
          return pageResult;
        });
    }

    calculateSizePerPageStatus() {
      const { sizePerPageList } = this.props;
      return sizePerPageList.map((_sizePerPage) => {
        const pageText = typeof _sizePerPage.text !== 'undefined' ? _sizePerPage.text : _sizePerPage;
        const pageNumber = typeof _sizePerPage.value !== 'undefined' ? _sizePerPage.value : _sizePerPage;
        return {
          text: `${pageText}`,
          page: pageNumber
        };
      });
    }
  };

