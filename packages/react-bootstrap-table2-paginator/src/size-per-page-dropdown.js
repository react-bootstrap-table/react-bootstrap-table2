import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import SizePerPageOption from './size-per-page-option';

const sizePerPageDefaultClass = 'react-bs-table-sizePerPage-dropdown';

const SizePerPageDropDown = (props) => {
  const {
    open,
    tableId,
    hidden,
    onClick,
    onBlur,
    options,
    className,
    variation,
    bootstrap4,
    btnContextual,
    optionRenderer,
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

  const id = tableId ? `${tableId}-pageDropDown` : 'pageDropDown';

  return (
    <span
      style={ dropDownStyle }
      className={ dropdownClasses }
    >
      <button
        id={ id }
        type="button"
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
        aria-labelledby={ id }
      >
        {
          options.map((option) => {
            if (optionRenderer) {
              return optionRenderer({
                ...option,
                onSizePerPageChange
              });
            }
            return (
              <SizePerPageOption
                { ...option }
                key={ option.text }
                bootstrap4={ bootstrap4 }
                onSizePerPageChange={ onSizePerPageChange }
              />
            );
          })
        }
      </ul>
    </span>
  );
};

SizePerPageDropDown.propTypes = {
  currSizePerPage: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSizePerPageChange: PropTypes.func.isRequired,
  bootstrap4: PropTypes.bool,
  tableId: PropTypes.string,
  open: PropTypes.bool,
  hidden: PropTypes.bool,
  btnContextual: PropTypes.string,
  variation: PropTypes.oneOf(['dropdown', 'dropup']),
  className: PropTypes.string,
  optionRenderer: PropTypes.func
};
SizePerPageDropDown.defaultProps = {
  open: false,
  hidden: false,
  btnContextual: 'btn-default btn-secondary',
  variation: 'dropdown',
  className: '',
  optionRenderer: null,
  bootstrap4: false,
  tableId: null
};


export default SizePerPageDropDown;
