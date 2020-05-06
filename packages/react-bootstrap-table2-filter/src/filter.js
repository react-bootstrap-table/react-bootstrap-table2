/* eslint eqeqeq: 0 */
/* eslint no-console: 0 */
import { FILTER_TYPE } from './const';
import { LIKE, EQ, NE, GT, GE, LT, LE } from './comparison';

export const filterByText = _ => (
  data,
  dataField,
  { filterVal: userInput = '', comparator = LIKE, caseSensitive },
  customFilterValue
) => {
  // make sure filter value to be a string
  const filterVal = userInput.toString();

  return (
    data.filter((row) => {
      let cell = _.get(row, dataField);
      if (customFilterValue) {
        cell = customFilterValue(cell, row);
      }
      const cellStr = _.isDefined(cell) ? cell.toString() : '';
      if (comparator === EQ) {
        return cellStr === filterVal;
      }
      if (caseSensitive) {
        return cellStr.includes(filterVal);
      }

      return cellStr.toLocaleUpperCase().indexOf(filterVal.toLocaleUpperCase()) !== -1;
    })
  );
};

export const filterByNumber = _ => (
  data,
  dataField,
  { filterVal: { comparator, number } },
  customFilterValue
) => (
  data.filter((row) => {
    if (number === '' || !comparator) return true;
    let cell = _.get(row, dataField);

    if (customFilterValue) {
      cell = customFilterValue(cell, row);
    }

    switch (comparator) {
      case EQ: {
        return cell == number;
      }
      case GT: {
        return cell > number;
      }
      case GE: {
        return cell >= number;
      }
      case LT: {
        return cell < number;
      }
      case LE: {
        return cell <= number;
      }
      case NE: {
        return cell != number;
      }
      default: {
        console.error('Number comparator provided is not supported');
        return true;
      }
    }
  })
);

export const filterByDate = _ => (
  data,
  dataField,
  { filterVal: { comparator, date } },
  customFilterValue
) => {
  if (!date || !comparator) return data;
  const filterDate = date.getUTCDate();
  const filterMonth = date.getUTCMonth();
  const filterYear = date.getUTCFullYear();

  return data.filter((row) => {
    let valid = true;
    let cell = _.get(row, dataField);

    if (customFilterValue) {
      cell = customFilterValue(cell, row);
    }

    if (typeof cell !== 'object') {
      cell = new Date(cell);
    }

    const targetDate = cell.getUTCDate();
    const targetMonth = cell.getUTCMonth();
    const targetYear = cell.getUTCFullYear();


    switch (comparator) {
      case EQ: {
        if (
          filterDate !== targetDate ||
          filterMonth !== targetMonth ||
          filterYear !== targetYear
        ) {
          valid = false;
        }
        break;
      }
      case GT: {
        if (cell <= date) {
          valid = false;
        }
        break;
      }
      case GE: {
        if (targetYear < filterYear) {
          valid = false;
        } else if (targetYear === filterYear &&
          targetMonth < filterMonth) {
          valid = false;
        } else if (targetYear === filterYear &&
          targetMonth === filterMonth &&
          targetDate < filterDate) {
          valid = false;
        }
        break;
      }
      case LT: {
        if (cell >= date) {
          valid = false;
        }
        break;
      }
      case LE: {
        if (targetYear > filterYear) {
          valid = false;
        } else if (targetYear === filterYear &&
          targetMonth > filterMonth) {
          valid = false;
        } else if (targetYear === filterYear &&
          targetMonth === filterMonth &&
          targetDate > filterDate) {
          valid = false;
        }
        break;
      }
      case NE: {
        if (
          filterDate === targetDate &&
          filterMonth === targetMonth &&
          filterYear === targetYear
        ) {
          valid = false;
        }
        break;
      }
      default: {
        console.error('Date comparator provided is not supported');
        break;
      }
    }
    return valid;
  });
};

export const filterByArray = _ => (
  data,
  dataField,
  { filterVal, comparator }
) => {
  if (filterVal.length === 0) return data;
  const refinedFilterVal = filterVal
    .filter(x => _.isDefined(x))
    .map(x => x.toString());
  return data.filter((row) => {
    const cell = _.get(row, dataField);
    let cellStr = _.isDefined(cell) ? cell.toString() : '';
    if (comparator === EQ) {
      return refinedFilterVal.indexOf(cellStr) !== -1;
    }
    cellStr = cellStr.toLocaleUpperCase();
    return refinedFilterVal.some(item => cellStr.indexOf(item.toLocaleUpperCase()) !== -1);
  });
};

export const filterFactory = _ => (filterType) => {
  let filterFn;
  switch (filterType) {
    case FILTER_TYPE.TEXT:
    case FILTER_TYPE.SELECT:
      filterFn = filterByText(_);
      break;
    case FILTER_TYPE.MULTISELECT:
      filterFn = filterByArray(_);
      break;
    case FILTER_TYPE.NUMBER:
      filterFn = filterByNumber(_);
      break;
    case FILTER_TYPE.DATE:
      filterFn = filterByDate(_);
      break;
    default:
      filterFn = filterByText(_);
  }
  return filterFn;
};

export const filters = (data, columns, _) => (currFilters, clearFilters = {}) => {
  const factory = filterFactory(_);
  const filterState = { ...clearFilters, ...currFilters };
  let result = data;
  let filterFn;
  Object.keys(filterState).forEach((dataField) => {
    let currentResult;
    let filterValue;
    let customFilter;
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i].dataField === dataField) {
        filterValue = columns[i].filterValue;
        if (columns[i].filter) {
          customFilter = columns[i].filter.props.onFilter;
        }
        break;
      }
    }

    if (clearFilters[dataField] && customFilter) {
      currentResult = customFilter(clearFilters[dataField].filterVal, result);
      if (typeof currentResult !== 'undefined') {
        result = currentResult;
      }
    } else {
      const filterObj = filterState[dataField];
      filterFn = factory(filterObj.filterType);
      if (customFilter) {
        currentResult = customFilter(filterObj.filterVal, result);
      }
      if (typeof currentResult === 'undefined') {
        result = filterFn(result, dataField, filterObj, filterValue);
      } else {
        result = currentResult;
      }
    }
  });
  return result;
};
