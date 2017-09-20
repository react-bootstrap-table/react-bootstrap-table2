import { sort } from './sort';
import Const from '../const';
import _ from '../utils';

export default class Store {
  constructor(props) {
    const { data, keyField } = props;
    this.keyField = keyField;
    this.data = data ? data.slice() : [];

    this.sortOrder = undefined;
    this.sortField = undefined;
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

  getRowByRowId(rowId) {
    return this.get().find(row => _.get(row, this.keyField) === rowId);
  }
}
