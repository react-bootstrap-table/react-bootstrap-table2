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
    this._filters = {};
    this._page = undefined;
    this._sizePerPage = undefined;
  }

  edit(rowId, dataField, newValue) {
    const row = getRowByRowId(this)(rowId);
    if (row) _.set(row, dataField, newValue);
  }

  setSort({ dataField }, order, defaultOrder) {
    this.sortOrder = nextOrder(this)(dataField, order, defaultOrder);
    this.sortField = dataField;
  }

  sortBy({ sortFunc }) {
    this.data = sort(this)(sortFunc);
  }

  getAllData() {
    return this._data;
  }

  setAllData(data) {
    this._data = data;
  }

  get data() {
    if (Object.keys(this._filters).length > 0) {
      return this._filteredData;
    }
    return this._data;
  }
  set data(data) {
    if (Object.keys(this._filters).length > 0) {
      this._filteredData = data;
    } else {
      this._data = (data ? JSON.parse(JSON.stringify(data)) : []);
    }
  }

  get filteredData() { return this._filteredData; }
  set filteredData(filteredData) { this._filteredData = filteredData; }

  get keyField() { return this._keyField; }
  set keyField(keyField) { this._keyField = keyField; }

  get sortOrder() { return this._sortOrder; }
  set sortOrder(sortOrder) { this._sortOrder = sortOrder; }

  get page() { return this._page; }
  set page(page) { this._page = page; }

  get sizePerPage() { return this._sizePerPage; }
  set sizePerPage(sizePerPage) { this._sizePerPage = sizePerPage; }

  get sortField() { return this._sortField; }
  set sortField(sortField) { this._sortField = sortField; }

  get selected() { return this._selected; }
  set selected(selected) { this._selected = selected; }

  get filters() { return this._filters; }
  set filters(filters) { this._filters = filters; }
}
