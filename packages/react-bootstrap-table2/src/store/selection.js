import _ from '../utils';
import { getRowByRowId } from './rows';

export const getSelectionSummary = (
  data,
  keyField,
  selected = []
) => {
  let allRowsSelected = data.length > 0;
  let allRowsNotSelected = true;

  const rowKeys = data.map(d => d[keyField]);
  for (let i = 0; i < rowKeys.length; i += 1) {
    const curr = rowKeys[i];
    if (typeof selected.find(x => x === curr) === 'undefined') {
      allRowsSelected = false;
    } else {
      allRowsNotSelected = false;
    }
  }
  return {
    allRowsSelected,
    allRowsNotSelected
  };
};

export const selectableKeys = (data, keyField, skips = []) => {
  if (skips.length === 0) {
    return data.map(row => _.get(row, keyField));
  }
  return data
    .filter(row => !skips.includes(_.get(row, keyField)))
    .map(row => _.get(row, keyField));
};

export const unSelectableKeys = (selected, skips = []) => {
  if (skips.length === 0) {
    return [];
  }
  return selected.filter(x => skips.includes(x));
};

export const getSelectedRows = (data, keyField, selected) =>
  selected.map(k => getRowByRowId(data, keyField, k)).filter(x => !!x);

