export default ExtendBase =>
  class ColumnResolver extends ExtendBase {
    visibleColumnSize(includeSelectColumn = true) {
      const columnLen = this.props.columns.filter(c => !c.hidden).length;
      if (!includeSelectColumn) return columnLen;
      if (this.props.selectRow && !this.props.selectRow.hideSelectColumn) {
        return columnLen + 1;
      }
      return columnLen;
    }
  };
