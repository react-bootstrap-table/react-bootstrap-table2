export default ExtendBase =>
  class ColumnResolver extends ExtendBase {
    visibleColumnSize() {
      return this.props.columns.length;
    }
  };
