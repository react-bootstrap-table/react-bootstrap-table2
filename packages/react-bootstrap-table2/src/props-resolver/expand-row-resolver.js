export default ExtendBase =>
  class ExpandRowResolver extends ExtendBase {
    resolveExpandRowProps() {
      const { expandRow, expanded, onRowExpand } = this.props;
      if (expandRow) {
        return {
          ...expandRow,
          expanded,
          onRowExpand,
          nonExpandable: expandRow.nonExpandable || []
        };
      }
      return null;
    }
  };
