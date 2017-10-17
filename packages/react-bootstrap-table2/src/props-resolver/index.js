import ColumnResolver from './column-resolver';
import Const from '../const';
import _ from '../utils';

export default ExtendBase =>
  class TableResolver extends ColumnResolver(ExtendBase) {
    validateProps() {
      const { columns, keyField } = this.props;
      if (!keyField) {
        throw new Error('Please specify a field as key via keyField');
      }
      if (this.visibleColumnSize(columns) <= 0) {
        throw new Error('No any visible columns detect');
      }
    }

    isEmpty() {
      return this.props.data.length === 0;
    }

    resolveCellEditProps(options = { currEditCell: null }) {
      const { cellEdit } = this.props;
      const nonEditableRows =
        (cellEdit && _.isFunction(cellEdit.nonEditableRows)) ? cellEdit.nonEditableRows() : [];
      const cellEditInfo = {
        ...options.currEditCell,
        nonEditableRows
      };

      if (_.isDefined(cellEdit)) {
        return {
          ...cellEdit,
          ...cellEditInfo,
          ...options
        };
      }
      return {
        mode: Const.UNABLE_TO_CELL_EDIT,
        ...cellEditInfo
      };
    }

    /**
     * props resolver for cell selection
     * @param {Object} options - addtional options like callback which are about to merge into props
     *
     * @returns {Object} result - props for cell selections
     * @returns {String} result.mode - input type of row selection or disabled.
     */
    resolveCellSelectionProps(options) {
      const { selectRow } = this.props;
      const { ROW_SELECT_DISABLED } = Const;

      if (_.isDefined(selectRow)) {
        return {
          ...selectRow,
          ...options
        };
      }

      return {
        mode: ROW_SELECT_DISABLED
      };
    }

    /**
     * props resolver for header cell selection
     * @param {Object} options - addtional options like callback which are about to merge into props
     *
     * @returns {Object} result - props for cell selections
     * @returns {String} result.mode - input type of row selection or disabled.
     * @returns {String} result.checkedStatus - checkbox status depending on selected rows counts
     */
    resolveHeaderCellSelectionProps(options = {}) {
      const { selectRow } = this.props;
      const { allRowsSelected, selected = [], ...rest } = options;
      const {
        ROW_SELECT_DISABLED, CHECKBOX_STATUS_CHECKED,
        CHECKBOX_STATUS_INDETERMINATE, CHECKBOX_STATUS_UNCHECKED
      } = Const;

      if (_.isDefined(selectRow)) {
        let checkedStatus;

        // checkbox status depending on selected rows counts
        if (allRowsSelected) checkedStatus = CHECKBOX_STATUS_CHECKED;
        else if (selected.length === 0) checkedStatus = CHECKBOX_STATUS_UNCHECKED;
        else checkedStatus = CHECKBOX_STATUS_INDETERMINATE;

        return {
          ...selectRow,
          ...rest,
          checkedStatus
        };
      }

      return {
        mode: ROW_SELECT_DISABLED
      };
    }
  };
