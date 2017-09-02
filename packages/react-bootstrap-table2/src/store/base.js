export default class Store {
  constructor(props) {
    const { data } = props;
    this.data = data ? data.slice() : [];
  }
}
