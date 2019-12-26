import React from 'react';
import PropTypes from 'prop-types';

import PageButton from './page-button';

const PaginatonList = props => (
  <ul className="pagination react-bootstrap-table-page-btns-ul">
    {
      props.pages.map((pageProps) => {
        if (props.pageButtonRenderer) {
          return props.pageButtonRenderer({
            ...pageProps,
            onPageChange: props.onPageChange
          });
        }
        return (
          <PageButton
            key={ pageProps.page }
            { ...pageProps }
            onPageChange={ props.onPageChange }
          />
        );
      })
    }
  </ul>
);

PaginatonList.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    page: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.number,
      PropTypes.string
    ]),
    active: PropTypes.bool,
    disable: PropTypes.bool,
    title: PropTypes.string
  })).isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageButtonRenderer: PropTypes.func
};

PaginatonList.defaultProps = {
  pageButtonRenderer: null
};

export default PaginatonList;
