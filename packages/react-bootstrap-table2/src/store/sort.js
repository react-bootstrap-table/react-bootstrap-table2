/* eslint no-nested-ternary: 0 */
/* eslint no-lonely-if: 0 */
/* eslint no-underscore-dangle: 0 */
import _ from '../utils';
import Const from '../const';

function comparator(a, b) {
  let result;
  if (typeof b === 'string') {
    result = b.localeCompare(a);
  } else {
    result = a > b ? -1 : ((a < b) ? 1 : 0);
  }
  return result;
}

const sort = (dataField, data, order, sortFunc) => {
  const _data = [...data];
  _data.sort((a, b) => {
    let result;
    let valueA = _.get(a, dataField);
    let valueB = _.get(b, dataField);
    valueA = _.isDefined(valueA) ? valueA : '';
    valueB = _.isDefined(valueB) ? valueB : '';

    if (sortFunc) {
      result = sortFunc(valueA, valueB, order, dataField);
    } else {
      if (order === Const.SORT_DESC) {
        result = comparator(valueA, valueB);
      } else {
        result = comparator(valueB, valueA);
      }
    }
    return result;
  });
  return _data;
};

/**
 *
 * @param {Object} props - store props.
 * @param {Object} props.columns - columns passing by user.
 *
 * @return {Object} - return table which contains initial sort order.
 */
const getSortOrderTable = ({ columns }) => {
  const sortOrderTable = {};
  const { SORT_UNSET, SORT_UNSORTABLE } = Const;

  columns.forEach((column) => {
    const { dataField, sort: sortable } = column;

    sortOrderTable[dataField] = sortable ? SORT_UNSET : SORT_UNSORTABLE;
  });

  return sortOrderTable;
};

export { sort, getSortOrderTable };
