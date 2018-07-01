export default ExtendBase =>
  class ExpandRowResolver extends ExtendBase {
    resolveExpandRowProps() {
      const { expandRow, expanded, onRowExpand, onAllRowExpand, isAnyExpands } = this.props;
      if (expandRow) {
        return {
          ...expandRow,
          expanded,
          onRowExpand,
          onAllRowExpand,
          isAnyExpands,
          nonExpandable: expandRow.nonExpandable || []
        };
      }
      return null;
    }
  };
