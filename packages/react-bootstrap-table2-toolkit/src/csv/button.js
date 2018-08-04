import React from 'react';
import PropTypes from 'prop-types';

const ExportCSVButton = (props) => {
  const {
    onExport,
    children,
    ...rest
  } = props;

  return (
    <button
      type="button"
      onClick={ onExport }
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
  className: 'react-bs-table-csv-btn btn btn-default',
  style: {}
};

export default ExportCSVButton;
