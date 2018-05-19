import _ from '../utils';
import { getRowByRowId } from './rows';

export const editCell = (rowId, dataField, newValue) => {
  const row = getRowByRowId(this)(rowId);
  if (row) _.set(row, dataField, newValue);
};
