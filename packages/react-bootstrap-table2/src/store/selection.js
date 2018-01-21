import _ from '../utils';
import { getRowByRowId } from './rows';

export const isSelectedAll = ({ data, selected }) => data.length === selected.length;

export const isAnySelectedRow = ({ selected }) => (skips = []) => {
  if (skips.length === 0) {
    return selected.length > 0;
  }
  return selected.filter(x => !skips.includes(x)).length;
};

export const selectableKeys = ({ data, keyField }) => (skips = []) => {
  if (skips.length === 0) {
    return data.map(row => _.get(row, keyField));
  }
  return data
    .filter(row => !skips.includes(_.get(row, keyField)))
    .map(row => _.get(row, keyField));
};

export const unSelectableKeys = ({ selected }) => (skips = []) => {
  if (skips.length === 0) {
    return [];
  }
  return selected.filter(x => skips.includes(x));
};

export const getSelectedRows = (store) => {
  const getRow = getRowByRowId(store);
  return store.selected.map(k => getRow(k));
};

