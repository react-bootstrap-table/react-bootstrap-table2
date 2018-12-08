/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import pageResolver from './page-resolver';

export default WrappedComponent =>
  class PaginationListAdapter extends pageResolver(Component) {
    render() {
      const { lastPage, totalPages, pageButtonRenderer, onPageChange } = this.props;
      const pages = this.calculatePageStatus(this.calculatePages(totalPages, lastPage), lastPage);
      return (
        <WrappedComponent
          pageButtonRenderer={ pageButtonRenderer }
          onPageChange={ onPageChange }
          pages={ pages }
        />
      );
    }
  };

