import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { BootstrapContext } from './bootstrap';
import SizePerPageOption from './size-per-page-option';

const sizePerPageDefaultClass = 'react-bs-table-sizePerPage-dropdown';

const SizePerPageDropDown = (props) => {
  const {
    open,
    hidden,
    onClick,
    onBlur,
    options,
    className,
    variation,
    btnContextual,
    currSizePerPage,
    onSizePerPageChange
  } = props;

  const dropDownStyle = { visibility: hidden ? 'hidden' : 'visible' };
  const openClass = open ? 'open show' : '';
  const dropdownClasses = cs(
    openClass,
    sizePerPageDefaultClass,
    variation,
    className,
  );

  return (
    <BootstrapContext.Consumer>
      {
        ({ bootstrap4 }) => (
          <span
            style={ dropDownStyle }
            className={ dropdownClasses }
          >
            <button
              id="pageDropDown"
              className={ `btn ${btnContextual} dropdown-toggle` }
              data-toggle="dropdown"
              aria-expanded={ open }
              onClick={ onClick }
              onBlur={ onBlur }
            >
              { currSizePerPage }
              { ' ' }
              {
                bootstrap4 ? null : (
                  <span>
                    <span className="caret" />
                  </span>
                )
              }
            </button>
            <ul
              className={ `dropdown-menu ${openClass}` }
              role="menu"
              aria-labelledby="pageDropDown"
            >
              {
                options.map(option => (
                  <SizePerPageOption
                    { ...option }
                    key={ option.text }
                    bootstrap4={ bootstrap4 }
                    onSizePerPageChange={ onSizePerPageChange }
                  />
                ))
              }
            </ul>
          </span>
        )
      }
    </BootstrapContext.Consumer>
  );
};

SizePerPageDropDown.propTypes = {
  currSizePerPage: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSizePerPageChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  hidden: PropTypes.bool,
  btnContextual: PropTypes.string,
  variation: PropTypes.oneOf(['dropdown', 'dropup']),
  className: PropTypes.string
};
SizePerPageDropDown.defaultProps = {
  open: false,
  hidden: false,
  btnContextual: 'btn-default btn-secondary',
  variation: 'dropdown',
  className: ''
};


export default SizePerPageDropDown;
