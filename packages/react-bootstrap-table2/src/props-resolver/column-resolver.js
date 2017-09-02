export default ExtendBase =>
  class ColumnResolver extends ExtendBase {
    columnSize() {
      return this.props.columns.length;
    }
  };
