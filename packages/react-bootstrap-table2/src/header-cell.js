import React from 'react';
import PropTypes from 'prop-types';


const HeaderCell = ({ column }) => (
  <th>
    { column.text }
  </th>
);

HeaderCell.propTypes = {
  column: PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default HeaderCell;
