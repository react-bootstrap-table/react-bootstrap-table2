import _ from '../utils';
import { getRowByRowId } from './rows';

export const editCell = (data, keyField, rowId, dataField, newValue) => {
  const row = getRowByRowId(data, keyField, rowId);
  if (row) _.set(row, dataField, newValue);
};
