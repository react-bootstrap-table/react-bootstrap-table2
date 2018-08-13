import React from 'react';
import PropTypes from 'prop-types';

const ExpandRow = ({ children, ...rest }) => (
  <tr className="expanding-row">
    <td { ...rest }>{ children }</td>
  </tr>
);

ExpandRow.propTypes = {
  children: PropTypes.node
};

ExpandRow.defaultProps = {
  children: null
};

export default ExpandRow;
