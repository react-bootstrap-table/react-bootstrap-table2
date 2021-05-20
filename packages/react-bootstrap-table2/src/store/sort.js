/* eslint no-nested-ternary: 0 */
/* eslint no-lonely-if: 0 */
/* eslint no-underscore-dangle: 0 */
import _ from '../utils';
import Const from '../const';

const collator = new Intl.Collator();
function comparator(a, b) {
  if (typeof b === 'string') {
    return collator.compare(a, b);
  } else {
    return a > b ? -1 : ((a < b) ? 1 : 0);
  }
}

export const sort = (data, sortOrder, { dataField, sortFunc, sortValue }) => {
  const _data = [...data];
  _data.sort((a, b) => {
    let result;
    let valueA = _.get(a, dataField);
    let valueB = _.get(b, dataField);
    if (sortValue) {
      valueA = sortValue(valueA, a);
      valueB = sortValue(valueB, b);
    } else {
      valueA = _.isDefined(valueA) ? valueA : '';
      valueB = _.isDefined(valueB) ? valueB : '';
    }

    if (sortFunc) {
      result = sortFunc(valueA, valueB, sortOrder, dataField, a, b);
    } else {
      if (sortOrder === Const.SORT_DESC) {
        result = comparator(valueA, valueB);
      } else {
        result = comparator(valueB, valueA);
      }
    }
    return result;
  });
  return _data;
};

export const nextOrder = (
  currentSortColumn,
  { sortOrder, sortColumn },
  defaultOrder = Const.SORT_DESC
) => {
  if (!sortColumn || currentSortColumn.dataField !== sortColumn.dataField) return defaultOrder;
  return sortOrder === Const.SORT_DESC ? Const.SORT_ASC : Const.SORT_DESC;
};
