/* eslint no-underscore-dangle: 0 */
import _ from '../utils';
import { sort, nextOrder } from './sort';
import { getRowByRowId } from './rows';

export default class Store {
  constructor(keyField) {
    this._data = [];
    this._keyField = keyField;

    this._sortOrder = undefined;
    this._sortField = undefined;
    this._selected = [];
  }

  edit(rowId, dataField, newValue) {
    const row = getRowByRowId(this)(rowId);
    if (row) _.set(row, dataField, newValue);
  }

  sortBy({ dataField, sortFunc }, order) {
    this.sortOrder = nextOrder(this)(dataField, order);
    this.sortField = dataField;
    this.data = sort(this)(sortFunc);
  }

  get data() { return this._data; }
  set data(data) { this._data = (data ? JSON.parse(JSON.stringify(data)) : []); }

  get keyField() { return this._keyField; }
  set keyField(keyField) { this._keyField = keyField; }

  get sortOrder() { return this._sortOrder; }
  set sortOrder(sortOrder) { this._sortOrder = sortOrder; }

  get sortField() { return this._sortField; }
  set sortField(sortField) { this._sortField = sortField; }

  get selected() { return this._selected; }
  set selected(selected) { this._selected = selected; }
}
