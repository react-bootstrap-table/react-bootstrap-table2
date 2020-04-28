/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import pageResolver from './page-resolver';
import PaginationList from './pagination-list';

const paginationListAdapter = WrappedComponent =>
  class PaginationListAdapter extends pageResolver(Component) {
    render() {
      const {
        lastPage,
        totalPages,
        pageButtonRenderer,
        onPageChange,
        disablePageTitle,
        hidePageListOnlyOnePage
      } = this.props;
      const pages = this.calculatePageStatus(
        this.calculatePages(totalPages, lastPage),
        lastPage,
        disablePageTitle
      );
      if (totalPages === 1 && hidePageListOnlyOnePage) {
        return null;
      }
      return (
        <WrappedComponent
          pageButtonRenderer={ pageButtonRenderer }
          onPageChange={ onPageChange }
          pages={ pages }
        />
      );
    }
  };


export const PaginationListWithAdapter = paginationListAdapter(PaginationList);
export default paginationListAdapter;
