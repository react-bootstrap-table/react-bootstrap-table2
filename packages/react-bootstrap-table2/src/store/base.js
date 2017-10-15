import { sort, getSortOrderTable } from './sort';
import Const from '../const';
import _ from '../utils';

export default class Store {
  constructor(props) {
    const { data, keyField } = props;
    this.keyField = keyField;
    this.data = data ? data.slice() : [];

    this.sortOrderTable = getSortOrderTable(props);
    this.sortField = undefined;
    this.selected = [];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  sortBy({ dataField, sortFunc }) {
    let order;

    switch (this.sortOrderTable[dataField]) {
      case Const.SORT_UNSET:
        order = Const.SORT_DESC;
        break;
      case Const.SORT_DESC:
        order = Const.SORT_ASC;
        break;
      default:
        order = Const.SORT_DESC;
        break;
    }

    this.sortOrderTable[dataField] = order;
    this.data = sort(dataField, this.data, this.sortOrderTable[dataField], sortFunc);
    this.sortField = dataField;
  }

  edit(rowId, dataField, newValue) {
    const row = this.getRowByRowId(rowId);
    if (row) _.set(row, dataField, newValue);
  }

  get() {
    return this.data;
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

  selectAllRowKeys() {
    return this.data.map(row => _.get(row, this.keyField));
  }

  isAllRowsSelected() {
    return this.data.length === this.selected.length;
  }

  isAnySelectedRow() {
    return this.selected.length > 0;
  }
}
