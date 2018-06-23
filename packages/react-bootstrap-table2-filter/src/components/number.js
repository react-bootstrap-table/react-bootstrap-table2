/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-return-assign: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Comparator from '../comparison';
import { FILTER_TYPE, FILTER_DELAY } from '../const';

const legalComparators = [
  Comparator.EQ,
  Comparator.NE,
  Comparator.GT,
  Comparator.GE,
  Comparator.LT,
  Comparator.LE
];

class NumberFilter extends Component {
  constructor(props) {
    super(props);
    this.comparators = props.comparators || legalComparators;
    this.timeout = null;
    let isSelected = props.defaultValue !== undefined && props.defaultValue.number !== undefined;
    if (props.options && isSelected) {
      isSelected = props.options.indexOf(props.defaultValue.number) > -1;
    }
    this.state = { isSelected };
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeNumberSet = this.onChangeNumberSet.bind(this);
    this.onChangeComparator = this.onChangeComparator.bind(this);
  }

  componentDidMount() {
    const { column, onFilter, getFilter } = this.props;
    const comparator = this.numberFilterComparator.value;
    const number = this.numberFilter.value;
    if (comparator && number) {
      onFilter(column, FILTER_TYPE.NUMBER)({ number, comparator });
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal) => {
        this.setState(() => ({ isSelected: (filterVal !== '') }));
        this.numberFilterComparator.value = filterVal.comparator;
        this.numberFilter.value = filterVal.number;

        onFilter(column, FILTER_TYPE.NUMBER)({
          number: filterVal.number,
          comparator: filterVal.comparator
        });
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onChangeNumber(e) {
    const { delay, column, onFilter } = this.props;
    const comparator = this.numberFilterComparator.value;
    if (comparator === '') {
      return;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const filterValue = e.target.value;
    this.timeout = setTimeout(() => {
      onFilter(column, FILTER_TYPE.NUMBER)({ number: filterValue, comparator });
    }, delay);
  }

  onChangeNumberSet(e) {
    const { column, onFilter } = this.props;
    const comparator = this.numberFilterComparator.value;
    const { value } = e.target;
    this.setState(() => ({ isSelected: (value !== '') }));
    // if (comparator === '') {
    //   return;
    // }
    onFilter(column, FILTER_TYPE.NUMBER)({ number: value, comparator });
  }

  onChangeComparator(e) {
    const { column, onFilter } = this.props;
    const value = this.numberFilter.value;
    const comparator = e.target.value;
    // if (value === '') {
    //   return;
    // }
    onFilter(column, FILTER_TYPE.NUMBER)({ number: value, comparator });
  }

  getComparatorOptions() {
    const optionTags = [];
    const { withoutEmptyComparatorOption } = this.props;
    if (!withoutEmptyComparatorOption) {
      optionTags.push(<option key="-1" />);
    }
    for (let i = 0; i < this.comparators.length; i += 1) {
      optionTags.push(
        <option key={ i } value={ this.comparators[i] }>
          { this.comparators[i] }
        </option>
      );
    }
    return optionTags;
  }

  getNumberOptions() {
    const optionTags = [];
    const { options, column, withoutEmptyNumberOption } = this.props;
    if (!withoutEmptyNumberOption) {
      optionTags.push(
        <option key="-1" value="">
          { this.props.placeholder || `Select ${column.text}...` }
        </option>
      );
    }
    for (let i = 0; i < options.length; i += 1) {
      optionTags.push(<option key={ i } value={ options[i] }>{ options[i] }</option>);
    }
    return optionTags;
  }

  applyFilter(filterObj) {
    const { column, onFilter } = this.props;
    const { number, comparator } = filterObj;
    this.setState(() => ({ isSelected: (number !== '') }));
    this.numberFilterComparator.value = comparator;
    this.numberFilter.value = number;
    onFilter(column, FILTER_TYPE.NUMBER)({ number, comparator });
  }

  cleanFiltered() {
    const { column, onFilter, defaultValue } = this.props;
    const value = defaultValue ? defaultValue.number : '';
    const comparator = defaultValue ? defaultValue.comparator : '';
    this.setState(() => ({ isSelected: (value !== '') }));
    this.numberFilterComparator.value = comparator;
    this.numberFilter.value = value;
    onFilter(column, FILTER_TYPE.NUMBER)({ number: value, comparator });
  }

  render() {
    const { isSelected } = this.state;
    const {
      defaultValue,
      column,
      options,
      style,
      className,
      numberStyle,
      numberClassName,
      comparatorStyle,
      comparatorClassName,
      placeholder
    } = this.props;
    const selectClass = `
      select-filter 
      number-filter-input 
      form-control 
      ${numberClassName} 
      ${!isSelected ? 'placeholder-selected' : ''}
    `;

    return (
      <div
        onClick={ e => e.stopPropagation() }
        className={ `filter number-filter ${className}` }
        style={ style }
      >
        <select
          ref={ n => this.numberFilterComparator = n }
          style={ comparatorStyle }
          className={ `number-filter-comparator form-control ${comparatorClassName}` }
          onChange={ this.onChangeComparator }
          defaultValue={ defaultValue ? defaultValue.comparator : '' }
        >
          { this.getComparatorOptions() }
        </select>
        {
          options ?
            <select
              ref={ n => this.numberFilter = n }
              style={ numberStyle }
              className={ selectClass }
              onChange={ this.onChangeNumberSet }
              defaultValue={ defaultValue ? defaultValue.number : '' }
            >
              { this.getNumberOptions() }
            </select> :
            <input
              ref={ n => this.numberFilter = n }
              type="number"
              style={ numberStyle }
              className={ `number-filter-input form-control ${numberClassName}` }
              placeholder={ placeholder || `Enter ${column.text}...` }
              onChange={ this.onChangeNumber }
              defaultValue={ defaultValue ? defaultValue.number : '' }
            />
        }
      </div>
    );
  }
}

NumberFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.number),
  defaultValue: PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comparator: PropTypes.oneOf([...legalComparators, ''])
  }),
  delay: PropTypes.number,
  /* eslint consistent-return: 0 */
  comparators: (props, propName) => {
    if (!props[propName]) {
      return;
    }
    for (let i = 0; i < props[propName].length; i += 1) {
      let comparatorIsValid = false;
      for (let j = 0; j < legalComparators.length; j += 1) {
        if (legalComparators[j] === props[propName][i] || props[propName][i] === '') {
          comparatorIsValid = true;
          break;
        }
      }
      if (!comparatorIsValid) {
        return new Error(`Number comparator provided is not supported.
          Use only ${legalComparators}`);
      }
    }
  },
  placeholder: PropTypes.string,
  withoutEmptyComparatorOption: PropTypes.bool,
  withoutEmptyNumberOption: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  comparatorStyle: PropTypes.object,
  comparatorClassName: PropTypes.string,
  numberStyle: PropTypes.object,
  numberClassName: PropTypes.string,
  getFilter: PropTypes.func
};

NumberFilter.defaultProps = {
  delay: FILTER_DELAY,
  options: undefined,
  defaultValue: {
    number: undefined,
    comparator: ''
  },
  withoutEmptyComparatorOption: false,
  withoutEmptyNumberOption: false,
  comparators: legalComparators,
  placeholder: undefined,
  style: undefined,
  className: '',
  comparatorStyle: undefined,
  comparatorClassName: '',
  numberStyle: undefined,
  numberClassName: ''
};

export default NumberFilter;
