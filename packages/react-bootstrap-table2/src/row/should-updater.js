/* eslint react/prop-types: 0 */
import _ from '../utils';

export default ExtendBase =>
  class RowShouldUpdater extends ExtendBase {
    shouldUpdateByWhenEditing(nextProps) {
      return (
        nextProps.editingRowIdx === nextProps.rowIndex ||
        (this.props.editingRowIdx === nextProps.rowIndex &&
        nextProps.editingRowIdx === null)
      );
    }

    shouldUpdatedBySelfProps(nextProps) {
      return (
        this.props.className !== nextProps.className ||
        !_.isEqual(this.props.style, nextProps.style) ||
        !_.isEqual(this.props.attrs, nextProps.attrs)
      );
    }

    shouldUpdatedByNormalProps(nextProps) {
      const shouldUpdate =
        this.props.rowIndex !== nextProps.rowIndex ||
        this.props.editable !== nextProps.editable ||
        !_.isEqual(this.props.row, nextProps.row) ||
        this.props.columns.length !== nextProps.columns.length;

      return shouldUpdate;
    }
  };
