/* eslint no-return-assign: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const handleDebounce = (func, wait, immediate) => {
  let timeout;

  return () => {
    const later = () => {
      timeout = null;

      if (!immediate) {
        func.apply(this, arguments);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait || 0);

    if (callNow) {
      func.appy(this, arguments);
    }
  };
};

const SearchBar = ({
  delay,
  onSearch,
  className,
  style,
  placeholder,
  searchText,
  ...rest
}) => {
  let input;
  const debounceCallback = handleDebounce(() => {
    onSearch(input.value);
  }, delay);

  return (
    <input
      ref={ n => input = n }
      type="text"
      style={ style }
      onKeyUp={ () => debounceCallback() }
      className={ `form-control ${className}` }
      defaultValue={ searchText }
      placeholder={ placeholder || SearchBar.defaultProps.placeholder }
      { ...rest }
    />
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  delay: PropTypes.number,
  searchText: PropTypes.string
};

SearchBar.defaultProps = {
  className: '',
  style: {},
  placeholder: 'Search',
  delay: 250,
  searchText: ''
};

export default SearchBar;
