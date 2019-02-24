import React from 'react';
import PropTypes from 'prop-types';

const ExportCSVButton = (props) => {
  const {
    onExport,
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      type="button"
      className={ `react-bs-table-csv-btn btn btn-default ${className}` }
      onClick={ () => onExport() }
      { ...rest }
    >
      { children }
    </button>
  );
};

ExportCSVButton.propTypes = {
  children: PropTypes.node.isRequired,
  onExport: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};
ExportCSVButton.defaultProps = {
  className: '',
  style: {}
};

export default ExportCSVButton;
