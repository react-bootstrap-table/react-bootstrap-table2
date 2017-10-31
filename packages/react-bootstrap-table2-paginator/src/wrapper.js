/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';

const wrapperFactory = baseElement =>
  class PaginationWrapper extends Component {
    render() {
      const base = baseElement({ ...this.props });

      const Pagination = this.props.pagination.Pagination;

      return (
        <div className="react-bootstrap-table-container">
          { base }
          <Pagination />
        </div>
      );
    }
  };

export default wrapperFactory;
