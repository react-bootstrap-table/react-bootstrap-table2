import React from 'react';
import PropTypes from 'prop-types';

const PaginationTotal = props => (
  <span className="react-bootstrap-table-pagination-total">
    &nbsp;Showing rows { props.from } to&nbsp;{ props.to + 1 } of&nbsp;{ props.dataSize }
  </span>
);

PaginationTotal.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  dataSize: PropTypes.number.isRequired
};

export default PaginationTotal;
