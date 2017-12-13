/* eslint no-underscore-dangle: 0 */
import _ from '../utils';
import { sort, nextOrder } from './sort';
import { getRowByRowId } from './rows';

export default class Store {
  constructor(keyField) {
    this._data = [];
    this._filteredData = [];
    this._keyField = keyField;
    this._sortOrder = undefined;
    this._sortField = undefined;
    this._selected = [];
    this._filtering = false;
    this._isDataChanged = false;
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

  getAllData() {
    return this._data;
  }

  get data() {
    if (this._filtering) {
      return this._filteredData;
    }
    return this._data;
  }
  set data(data) {
    if (this._filtering) {
      this._filteredData = data;
    } else {
      this._data = (data ? JSON.parse(JSON.stringify(data)) : []);
    }
  }

  get filteredData() { return this._filteredData; }
  set filteredData(filteredData) { this._filteredData = filteredData; }

  get keyField() { return this._keyField; }
  set keyField(keyField) { this._keyField = keyField; }

  get isDataChanged() { return this._isDataChanged; }
  set isDataChanged(isDataChanged) { this._isDataChanged = isDataChanged; }

  get sortOrder() { return this._sortOrder; }
  set sortOrder(sortOrder) { this._sortOrder = sortOrder; }

  get sortField() { return this._sortField; }
  set sortField(sortField) { this._sortField = sortField; }

  get selected() { return this._selected; }
  set selected(selected) { this._selected = selected; }

  get filtering() { return this._filtering; }
  set filtering(filtering) { this._filtering = filtering; }
}
