export default ExtendBase =>
  class ColumnResolver extends ExtendBase {
    visibleColumnSize() {
      return this.props.columns.filter(c => !c.hidden).length;
    }
  };
