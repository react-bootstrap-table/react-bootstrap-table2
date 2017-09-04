import { sort } from './sort';
import Const from '../const';

export default class Store {
  constructor(props) {
    const { data } = props;
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

  get() {
    return this.data;
  }
}
