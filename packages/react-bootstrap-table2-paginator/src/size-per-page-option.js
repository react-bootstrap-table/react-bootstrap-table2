/* eslint jsx-a11y/href-no-hash: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const SizePerPageOption = ({
  text,
  page,
  onSizePerPageChange
}) => (
  <li key={ text } role="presentation" className="dropdown-item">
    <a
      href="#"
      tabIndex="-1"
      role="menuitem"
      data-page={ page }
      onMouseDown={ (e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      } }
    >
      { text }
    </a>
  </li>
);

SizePerPageOption.propTypes = {
  text: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onSizePerPageChange: PropTypes.func.isRequired
};

export default SizePerPageOption;
