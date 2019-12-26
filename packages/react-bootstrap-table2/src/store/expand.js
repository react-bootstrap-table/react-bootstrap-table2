import _ from '../utils';
import { getRowByRowId } from './rows';

export const isAnyExpands = (
  data,
  keyField,
  expanded = []
) => {
  for (let i = 0; i < data.length; i += 1) {
    const rowKey = _.get(data[i], keyField);
    if (typeof expanded.find(x => x === rowKey) !== 'undefined') {
      return true;
    }
  }
  return false;
};

export const expandableKeys = (data, keyField, skips = []) => {
  if (skips.length === 0) {
    return data.map(row => _.get(row, keyField));
  }
  return data
    .filter(row => !_.contains(skips, _.get(row, keyField)))
    .map(row => _.get(row, keyField));
};

export const getExpandedRows = (data, keyField, expanded) =>
  expanded.map(k => getRowByRowId(data, keyField, k));
