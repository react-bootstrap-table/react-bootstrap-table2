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
  return `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}`;
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
      this.applyFilter(date, comparator, true);
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal) => {
        const nullableFilterVal = filterVal || { date: null, comparator: null };
        this.dateFilterComparator.value = nullableFilterVal.comparator;
        this.inputDate.value = nullableFilterVal.date ? dateParser(nullableFilterVal.date) : null;

        this.applyFilter(nullableFilterVal.date, nullableFilterVal.comparator);
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

  getDefaultComparator() {
    const { defaultValue, filterState } = this.props;
    if (filterState && filterState.filterVal) {
      return filterState.filterVal.comparator;
    }
    if (defaultValue && defaultValue.comparator) {
      return defaultValue.comparator;
    }
    return '';
  }

  getDefaultDate() {
    // Set the appropriate format for the input type=date, i.e. "YYYY-MM-DD"
    const { defaultValue, filterState } = this.props;
    if (filterState && filterState.filterVal && filterState.filterVal.date) {
      return dateParser(filterState.filterVal.date);
    }
    if (defaultValue && defaultValue.date) {
      return dateParser(new Date(defaultValue.date));
    }
    return '';
  }

  applyFilter(value, comparator, isInitial) {
    // if (!comparator || !value) {
    //  return;
    // }
    const { column, onFilter, delay } = this.props;
    const execute = () => {
      // Incoming value should always be a string, and the defaultDate
      // above is implemented as an empty string, so we can just check for that.
      // instead of parsing an invalid Date. The filter function will interpret
      // null as an empty date field
      const date = value === '' ? null : new Date(value);
      onFilter(column, FILTER_TYPE.DATE, isInitial)({ date, comparator });
    };
    if (delay) {
      this.timeout = setTimeout(() => { execute(); }, delay);
    } else {
      execute();
    }
  }

  render() {
    const {
      id,
      placeholder,
      column: { dataField, text },
      style,
      comparatorStyle,
      dateStyle,
      className,
      comparatorClassName,
      dateClassName
    } = this.props;

    const comparatorElmId = `date-filter-comparator-${dataField}${id ? `-${id}` : ''}`;
    const inputElmId = `date-filter-column-${dataField}${id ? `-${id}` : ''}`;

    return (
      <div
        onClick={ e => e.stopPropagation() }
        className={ `filter date-filter ${className}` }
        style={ style }
      >
        <label
          className="filter-label"
          htmlFor={ comparatorElmId }
        >
          <span className="sr-only">Filter comparator</span>
          <select
            ref={ n => this.dateFilterComparator = n }
            id={ comparatorElmId }
            style={ comparatorStyle }
            className={ `date-filter-comparator form-control ${comparatorClassName}` }
            onChange={ this.onChangeComparator }
            defaultValue={ this.getDefaultComparator() }
          >
            { this.getComparatorOptions() }
          </select>
        </label>
        <label htmlFor={ inputElmId }>
          <span className="sr-only">Enter ${ text }</span>
          <input
            ref={ n => this.inputDate = n }
            id={ inputElmId }
            className={ `filter date-filter-input form-control ${dateClassName}` }
            style={ dateStyle }
            type="date"
            onChange={ this.onChangeDate }
            placeholder={ placeholder || `Enter ${text}...` }
            defaultValue={ this.getDefaultDate() }
          />
        </label>
      </div>
    );
  }
}

DateFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  id: PropTypes.string,
  filterState: PropTypes.object,
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
  filterState: {},
  withoutEmptyComparatorOption: false,
  comparators: legalComparators,
  placeholder: undefined,
  style: undefined,
  className: '',
  comparatorStyle: undefined,
  comparatorClassName: '',
  dateStyle: undefined,
  dateClassName: '',
  id: null
};


export default DateFilter;
