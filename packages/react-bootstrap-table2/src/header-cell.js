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
    text: PropTypes.string.isRequired,
    formatter: PropTypes.func,
    formatExtraData: PropTypes.any,
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  }).isRequired
};

export default HeaderCell;
