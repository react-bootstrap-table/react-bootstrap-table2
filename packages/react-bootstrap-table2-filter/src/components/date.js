/* eslint react/require-default-props: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint no-return-assign: 0 */
/* eslint prefer-template: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import * as Comparator from '../comparison';
import { FILTER_TYPE } from '../const';

const legalComparators = [
  Comparator.EQ,
  Comparator.NE,
  Comparator.GT,
  Comparator.GE,
  Comparator.LT,
  Comparator.LE
];

function dateParser(d) {
  return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
}

class DateFilter extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.comparators = props.comparators || legalComparators;
    this.applyFilter = this.applyFilter.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeComparator = this.onChangeComparator.bind(this);
  }

  componentDidMount() {
    const { getFilter } = this.props;
    const comparator = this.dateFilterComparator.value;
    const date = this.inputDate.value;
    if (comparator && date) {
      this.applyFilter(date, comparator);
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal) => {
        this.dateFilterComparator.value = filterVal.comparator;
        this.inputDate.value = dateParser(filterVal.date);

        this.applyFilter(filterVal.date, filterVal.comparator);
      });
    }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  onChangeDate(e) {
    const comparator = this.dateFilterComparator.value;
    const filterValue = e.target.value;
    this.applyFilter(filterValue, comparator);
  }

  onChangeComparator(e) {
    const value = this.inputDate.value;
    const comparator = e.target.value;
    this.applyFilter(value, comparator);
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

  getDefaultDate() {
    let defaultDate = '';
    const { defaultValue } = this.props;
    if (defaultValue && defaultValue.date) {
      // Set the appropriate format for the input type=date, i.e. "YYYY-MM-DD"
      defaultDate = dateParser(new Date(defaultValue.date));
    }
    return defaultDate;
  }

  applyFilter(value, comparator) {
    if (!comparator || !value) {
      return;
    }
    const { column, onFilter, delay } = this.props;
    const execute = () => {
      const date = typeof value !== 'object' ? new Date(value) : value;
      onFilter(column, FILTER_TYPE.DATE)({ date, comparator });
    };
    if (delay) {
      this.timeout = setTimeout(() => { execute(); }, delay);
    } else {
      execute();
    }
  }

  render() {
    const {
      placeholder,
      column: { text },
      style,
      comparatorStyle,
      dateStyle,
      className,
      comparatorClassName,
      dateClassName,
      defaultValue
    } = this.props;

    return (
      <div
        onClick={ e => e.stopPropagation() }
        className={ `filter date-filter ${className}` }
        style={ style }
      >
        <select
          ref={ n => this.dateFilterComparator = n }
          style={ comparatorStyle }
          className={ `date-filter-comparator form-control ${comparatorClassName}` }
          onChange={ this.onChangeComparator }
          defaultValue={ defaultValue ? defaultValue.comparator : '' }
        >
          { this.getComparatorOptions() }
        </select>
        <input
          ref={ n => this.inputDate = n }
          className={ `filter date-filter-input form-control ${dateClassName}` }
          style={ dateStyle }
          type="date"
          onChange={ this.onChangeDate }
          placeholder={ placeholder || `Enter ${text}...` }
          defaultValue={ this.getDefaultDate() }
        />
      </div>
    );
  }
}

DateFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  delay: PropTypes.number,
  defaultValue: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.object]),
    comparator: PropTypes.oneOf([...legalComparators, ''])
  }),
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
        return new Error(`Date comparator provided is not supported.
          Use only ${legalComparators}`);
      }
    }
  },
  placeholder: PropTypes.string,
  withoutEmptyComparatorOption: PropTypes.bool,
  style: PropTypes.object,
  comparatorStyle: PropTypes.object,
  dateStyle: PropTypes.object,
  className: PropTypes.string,
  comparatorClassName: PropTypes.string,
  dateClassName: PropTypes.string,
  getFilter: PropTypes.func
};

DateFilter.defaultProps = {
  delay: 0,
  defaultValue: {
    date: undefined,
    comparator: ''
  },
  withoutEmptyComparatorOption: false,
  comparators: legalComparators,
  placeholder: undefined,
  style: undefined,
  className: '',
  comparatorStyle: undefined,
  comparatorClassName: '',
  dateStyle: undefined,
  dateClassName: ''
};


export default DateFilter;
