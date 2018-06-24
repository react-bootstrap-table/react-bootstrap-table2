/* eslint react/require-default-props: 0 */
/* eslint no-return-assign: 0 */
/* eslint react/no-unused-prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LIKE, EQ } from '../comparison';
import { FILTER_TYPE } from '../const';

function optionsEquals(currOpts, prevOpts) {
  const keys = Object.keys(currOpts);
  for (let i = 0; i < keys.length; i += 1) {
    if (currOpts[keys[i]] !== prevOpts[keys[i]]) {
      return false;
    }
  }
  return Object.keys(currOpts).length === Object.keys(prevOpts).length;
}

class SelectFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    const isSelected = props.options[props.defaultValue] !== undefined;
    this.state = { isSelected };
  }

  componentDidMount() {
    const { column, onFilter, getFilter } = this.props;

    const value = this.selectInput.value;
    if (value && value !== '') {
      onFilter(column, FILTER_TYPE.SELECT)(value);
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
    if (this.props.defaultValue !== prevProps.defaultValue) {
      needFilter = true;
    } else if (!optionsEquals(this.props.options, prevProps.options)) {
      needFilter = true;
    }
    if (needFilter) {
      const value = this.selectInput.value;
      if (value) {
        this.props.onFilter(this.props.column, FILTER_TYPE.SELECT)(value);
      }
    }
  }

  getOptions() {
    const optionTags = [];
    const { options, placeholder, column, withoutEmptyOption } = this.props;
    if (!withoutEmptyOption) {
      optionTags.push((
        <option key="-1" value="">{ placeholder || `Select ${column.text}...` }</option>
      ));
    }
    Object.keys(options).forEach(key =>
      optionTags.push(<option key={ key } value={ key }>{ options[key] }</option>)
    );
    return optionTags;
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

  render() {
    const {
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
      ...rest
    } = this.props;

    const selectClass =
      `filter select-filter form-control ${className} ${this.state.isSelected ? '' : 'placeholder-selected'}`;

    return (
      <select
        { ...rest }
        ref={ n => this.selectInput = n }
        style={ style }
        className={ selectClass }
        onChange={ this.filter }
        onClick={ e => e.stopPropagation() }
        defaultValue={ defaultValue !== undefined ? defaultValue : '' }
      >
        { this.getOptions() }
      </select>
    );
  }
}

SelectFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
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
  className: '',
  withoutEmptyOption: false,
  comparator: EQ,
  caseSensitive: true
};

export default SelectFilter;
