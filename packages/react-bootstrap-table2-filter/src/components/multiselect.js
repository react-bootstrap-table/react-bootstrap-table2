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

const getSelections = container =>
  Array.from(container.selectedOptions).map(item => item.value);

class MultiSelectFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    const isSelected = props.defaultValue.map(item => props.options[item]).length > 0;
    this.state = { isSelected };
  }

  componentDidMount() {
    const { column, onFilter, getFilter } = this.props;

    const value = getSelections(this.selectInput);
    if (value && value.length > 0) {
      onFilter(column, FILTER_TYPE.MULTISELECT)(value);
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal) => {
        this.setState(() => ({ isSelected: filterVal.length > 0 }));
        this.selectInput.value = filterVal;

        onFilter(column, FILTER_TYPE.MULTISELECT)(filterVal);
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
        this.props.onFilter(this.props.column, FILTER_TYPE.MULTISELECT)(value);
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
    const value = (this.props.defaultValue !== undefined) ? this.props.defaultValue : [];
    this.setState(() => ({ isSelected: value.length > 0 }));
    this.selectInput.value = value;
    this.props.onFilter(this.props.column, FILTER_TYPE.MULTISELECT)(value);
  }

  applyFilter(value) {
    this.selectInput.value = value;
    this.setState(() => ({ isSelected: value.length > 0 }));
    this.props.onFilter(this.props.column, FILTER_TYPE.MULTISELECT)(value);
  }

  filter(e) {
    const value = getSelections(e.target);
    this.setState(() => ({ isSelected: value.length > 0 }));
    this.props.onFilter(this.props.column, FILTER_TYPE.MULTISELECT)(value);
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
        multiple
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

MultiSelectFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  comparator: PropTypes.oneOf([LIKE, EQ]),
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  withoutEmptyOption: PropTypes.bool,
  defaultValue: PropTypes.array,
  caseSensitive: PropTypes.bool,
  getFilter: PropTypes.func
};

MultiSelectFilter.defaultProps = {
  defaultValue: [],
  className: '',
  withoutEmptyOption: false,
  comparator: EQ,
  caseSensitive: true
};

export default MultiSelectFilter;
