export default ExtendBase =>
  class Store extends ExtendBase {
    constructor(props) {
      super(props);
      const { data } = this.props;
      this.data = data ? data.slice() : [];
    }
  };
