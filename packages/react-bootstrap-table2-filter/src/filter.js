import { FILTER_TYPE } from './const';
import { LIKE, EQ } from './comparison';

export const filterByText = _ => (data, dataField, { filterVal, comparator = LIKE }) =>
  data.filter((row) => {
    const cell = _.get(row, dataField);
    const cellStr = _.isDefined(cell) ? cell.toString() : '';
    if (comparator === EQ) {
      return cellStr === filterVal;
    }
    return cellStr.indexOf(filterVal) > -1;
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

export const filters = (store, _) => (currFilters) => {
  const factory = filterFactory(_);
  let result = store.getAllData();
  let filterFn;
  Object.keys(currFilters).forEach((dataField) => {
    const filterObj = currFilters[dataField];
    filterFn = factory(filterObj.filterType);
    result = filterFn(result, dataField, filterObj);
  });
  return result;
};
