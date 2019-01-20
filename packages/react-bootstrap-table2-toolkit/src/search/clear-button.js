import React from 'react';
import PropTypes from 'prop-types';

const ClearButton = ({
  onClear,
  text
}) => (
  <button className="btn btn-default" onClick={ onClear }>{ text }</button>
);

ClearButton.propTypes = {
  onClear: PropTypes.func.isRequired,
  text: PropTypes.string
};

ClearButton.defaultProps = {
  text: 'Clear'
};

export default ClearButton;
