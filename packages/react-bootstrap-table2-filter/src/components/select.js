/* eslint react/require-default-props: 0 */
/* eslint no-return-assign: 0 */
/* eslint react/no-unused-prop-types: 0 */
/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LIKE, EQ } from '../comparison';
import { FILTER_TYPE } from '../const';

function optionsEquals(currOpts, prevOpts) {
  if (Array.isArray(currOpts)) {
    if (currOpts.length === prevOpts.length) {
      for (let i = 0; i < currOpts.length; i += 1) {
        if (
          currOpts[i].value !== prevOpts[i].value ||
          currOpts[i].label !== prevOpts[i].label
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  const keys = Object.keys(currOpts);
  for (let i = 0; i < keys.length; i += 1) {
    if (currOpts[keys[i]] !== prevOpts[keys[i]]) {
      return false;
    }
  }
  return Object.keys(currOpts).length === Object.keys(prevOpts).length;
}

function getOptionValue(options, key) {
  if (Array.isArray(options)) {
    const result = options
      .filter(({ label }) => label === key)
      .map(({ value }) => value);
    return result[0];
  }
  return options[key];
}

class SelectFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.options = this.getOptions(props);
    const isSelected = getOptionValue(this.options, this.getDefaultValue()) !== undefined;
    this.state = { isSelected };
  }

  componentDidMount() {
    const { column, onFilter, getFilter } = this.props;

    const value = this.selectInput.value;
    if (value && value !== '') {
      onFilter(column, FILTER_TYPE.SELECT, true)(value);
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal) => {
        this.setState(() => ({ isSelected: filterVal !== '' }));
        this.selectInput.value = filterVal;

        onFilter(column, FILTER_TYPE.SELECT)(filterVal);
      });
    }
  }

  componentDidUpdate(prevProps) {
    let needFilter = false;
    const {
      column,
      onFilter,
      defaultValue
    } = this.props;
    const nextOptions = this.getOptions(this.props);
    if (defaultValue !== prevProps.defaultValue) {
      needFilter = true;
    } else if (!optionsEquals(nextOptions, this.options)) {
      this.options = nextOptions;
      needFilter = true;
    }
    if (needFilter) {
      const value = this.selectInput.value;
      if (value) {
        onFilter(column, FILTER_TYPE.SELECT)(value);
      }
    }
  }

  getOptions(props) {
    return typeof props.options === 'function' ? props.options(props.column) : props.options;
  }

  getDefaultValue() {
    const { filterState, defaultValue } = this.props;
    if (filterState && typeof filterState.filterVal !== 'undefined') {
      return filterState.filterVal;
    }
    return defaultValue;
  }

  cleanFiltered() {
    const value = (this.props.defaultValue !== undefined) ? this.props.defaultValue : '';
    this.setState(() => ({ isSelected: value !== '' }));
    this.selectInput.value = value;
    this.props.onFilter(this.props.column, FILTER_TYPE.SELECT)(value);
  }

  applyFilter(value) {
    this.selectInput.value = value;
    this.setState(() => ({ isSelected: value !== '' }));
    this.props.onFilter(this.props.column, FILTER_TYPE.SELECT)(value);
  }

  filter(e) {
    const { value } = e.target;
    this.setState(() => ({ isSelected: value !== '' }));
    this.props.onFilter(this.props.column, FILTER_TYPE.SELECT)(value);
  }

  renderOptions() {
    const optionTags = [];
    const { options } = this;
    const { placeholder, column, withoutEmptyOption } = this.props;
    if (!withoutEmptyOption) {
      optionTags.push((
        <option key="-1" value="">{ placeholder || `Select ${column.text}...` }</option>
      ));
    }
    if (Array.isArray(options)) {
      options.forEach(({ value, label }) =>
        optionTags.push(<option key={ value } value={ value }>{ label }</option>));
    } else {
      Object.keys(options).forEach(key =>
        optionTags.push(<option key={ key } value={ key }>{ options[key] }</option>)
      );
    }
    return optionTags;
  }

  render() {
    const {
      id,
      style,
      className,
      defaultValue,
      onFilter,
      column,
      options,
      comparator,
      withoutEmptyOption,
      caseSensitive,
      getFilter,
      filterState,
      ...rest
    } = this.props;

    const selectClass =
      `filter select-filter form-control ${className} ${this.state.isSelected ? '' : 'placeholder-selected'}`;
    const elmId = `select-filter-column-${column.dataField}${id ? `-${id}` : ''}`;

    return (
      <label
        className="filter-label"
        htmlFor={ elmId }
      >
        <span className="sr-only">Filter by { column.text }</span>
        <select
          { ...rest }
          ref={ n => this.selectInput = n }
          id={ elmId }
          style={ style }
          className={ selectClass }
          onChange={ this.filter }
          onClick={ e => e.stopPropagation() }
          defaultValue={ this.getDefaultValue() || '' }
        >
          { this.renderOptions() }
        </select>
      </label>
    );
  }
}

SelectFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  id: PropTypes.string,
  filterState: PropTypes.object,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  comparator: PropTypes.oneOf([LIKE, EQ]),
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  withoutEmptyOption: PropTypes.bool,
  defaultValue: PropTypes.any,
  caseSensitive: PropTypes.bool,
  getFilter: PropTypes.func
};

SelectFilter.defaultProps = {
  defaultValue: '',
  filterState: {},
  className: '',
  withoutEmptyOption: false,
  comparator: EQ,
  caseSensitive: true,
  id: null
};

export default SelectFilter;
