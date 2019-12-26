import React from 'react';
import PropTypes from 'prop-types';

const ClearButton = ({
  onClear,
  text,
  className
}) => (
  <button className={ `btn btn-default ${className}` } onClick={ onClear }>{ text }</button>
);

ClearButton.propTypes = {
  onClear: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string
};

ClearButton.defaultProps = {
  text: 'Clear',
  className: ''
};

export default ClearButton;
