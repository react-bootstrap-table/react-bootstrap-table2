/* eslint react/prop-types: 0 */
import _ from './utils';

export default ExtendBase =>
  class RowShouldUpdater extends ExtendBase {
    shouldUpdateByWhenEditing(nextProps) {
      return (
        nextProps.editingRowIdx === nextProps.rowIndex ||
        (this.props.editingRowIdx === nextProps.rowIndex &&
        nextProps.editingRowIdx === null)
      );
    }

    shouldUpdatedByNormalProps(nextProps) {
      const shouldUpdate =
        this.props.rowIndex !== nextProps.rowIndex ||
        this.props.className !== nextProps.className ||
        this.props.editable !== nextProps.editable ||
        this.props.columns.length !== nextProps.columns.length ||
        !_.isEqual(this.props.row, nextProps.row) ||
        !_.isEqual(this.props.style, nextProps.style);

      return shouldUpdate;
    }
  };
