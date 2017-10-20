/* eslint class-methods-use-this: 0 */
import { sort } from './sort';
import Const from '../const';
import _ from '../utils';

export default class Store {
  constructor(props) {
    const { data, keyField } = props;
    this.keyField = keyField;
    this.set(data);

    this.sortOrder = undefined;
    this.sortField = undefined;
    this.selected = [];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  sortBy({ dataField, sortFunc }) {
    if (dataField !== this.sortField) {
      this.sortOrder = Const.SORT_DESC;
    } else {
      this.sortOrder = this.sortOrder === Const.SORT_DESC ? Const.SORT_ASC : Const.SORT_DESC;
    }

    this.data = sort(dataField, this.data, this.sortOrder, sortFunc);
    this.sortField = dataField;
  }

  edit(rowId, dataField, newValue) {
    const row = this.getRowByRowId(rowId);
    if (row) _.set(row, dataField, newValue);
  }

  get() {
    return this.data;
  }

  set(data) {
    this.data = data ? JSON.parse(JSON.stringify(data)) : [];
  }

  getRowByRowId(rowId) {
    return this.get().find(row => _.get(row, this.keyField) === rowId);
  }

  setSelectedRowKeys(selectedKeys) {
    this.selected = selectedKeys;
  }

  getSelectedRowKeys() {
    return this.selected;
  }

  selectAllRows(nonSelectableRows = []) {
    if (nonSelectableRows.length === 0) {
      return this.data.map(row => _.get(row, this.keyField));
    }
    return this.data
      .filter(row => !nonSelectableRows.includes(_.get(row, this.keyField)))
      .map(row => _.get(row, this.keyField));
  }

  cleanSelectedRows(nonSelectableRows = []) {
    if (nonSelectableRows.length === 0) {
      return [];
    }
    return this.selected.filter(x => nonSelectableRows.includes(x));
  }

  isAllRowsSelected() {
    return this.data.length === this.selected.length;
  }

  isAnySelectedRow(nonSelectableRows = []) {
    if (nonSelectableRows.length === 0) {
      return this.selected.length > 0;
    }
    return this.selected.filter(x => !nonSelectableRows.includes(x)).length;
  }
}
