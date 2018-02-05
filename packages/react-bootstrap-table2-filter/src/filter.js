import { FILTER_TYPE } from './const';
import { LIKE, EQ } from './comparison';

export const filterByText = _ => (
  data,
  dataField,
  { filterVal, comparator = LIKE, caseSensitive },
  customFilterValue
) =>
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
      return cellStr.toLocaleUpperCase().includes(filterVal.toLocaleUpperCase());
    }
    return cellStr.includes(filterVal);
  });

export const filterFactory = _ => (filterType) => {
  let filterFn;
  switch (filterType) {
    case FILTER_TYPE.TEXT:
      filterFn = filterByText(_);
      break;
    default:
      filterFn = filterByText(_);
  }
  return filterFn;
};

export const filters = (store, columns, _) => (currFilters) => {
  const factory = filterFactory(_);
  let result = store.getAllData();
  let filterFn;
  Object.keys(currFilters).forEach((dataField) => {
    const filterObj = currFilters[dataField];
    filterFn = factory(filterObj.filterType);
    const { filterValue } = columns.find(col => col.dataField === dataField);
    result = filterFn(result, dataField, filterObj, filterValue);
  });
  return result;
};
