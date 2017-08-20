import React from 'react';
import PropTypes from 'prop-types';


const Cell = ({ value }) => (
  <td>{ value }</td>
);

Cell.propTypes = {
  value: PropTypes.any.isRequired
};

export default Cell;
