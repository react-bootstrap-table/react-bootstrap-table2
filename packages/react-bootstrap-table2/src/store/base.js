import TableResolver from '../props-resolver';

export default ExtendBase =>
  class Store extends TableResolver(ExtendBase) {
    constructor(props) {
      super(props);
      const { data } = this.props;
      this.data = data ? data.slice() : [];
    }
  };
