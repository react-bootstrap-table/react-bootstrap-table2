import _ from '../utils';

export const matchRow = (keyField, id) => row => _.get(row, keyField) === id;

export const getRowByRowId = (data, keyField, id) => data.find(matchRow(keyField, id));
