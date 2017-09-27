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

    resolveCellEditProps(options) {
      const { cellEdit } = this.props;
      const { currEditCell } = this.state;
      const nonEditableRows =
        (cellEdit && _.isFunction(cellEdit.nonEditableRows)) ? cellEdit.nonEditableRows() : [];
      const cellEditInfo = {
        ...currEditCell,
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
     * @param {Object} options - addtional options like callback for cell selection
     *
     * @returns {Object} result
     * @returns {String} result.mode - input type of row selection or disabled.
     */
    resolveCellSelectionProps(options) {
      const { selectRow } = this.props;
      const { ROW_SELECT_SINGLE, ROW_SELECT_MULTIPLE, ROW_SELECT_DISABLED } = Const;

      if (_.isDefined(selectRow)) {
        let { mode } = selectRow;

        if (!mode || (mode !== ROW_SELECT_SINGLE && mode !== ROW_SELECT_MULTIPLE)) {
          mode = Const.ROW_SELECT_MULTIPLE;
        }

        return {
          ...selectRow,
          ...options,
          mode
        };
      }

      return {
        mode: ROW_SELECT_DISABLED
      };
    }

    /**
     * props resolver for header cell selection
     * @param {Object} options - addtional options like callback for header cell selection
     *
     * @returns {Object} result
     * @returns {String} result.mode - input type of row selection or disabled.
     * @returns {String} result.checkedStatus - checkbox status depending on selected rows counts
     */
    resolveHeaderCellSelectionProps(options) {
      const { data, selectedRowKeys } = this.state;
      const { selectRow } = this.props;
      const {
        ROW_SELECT_SINGLE, ROW_SELECT_MULTIPLE, ROW_SELECT_DISABLED,
        CHECKBOX_STATUS_CHECKED, CHECKBOX_STATUS_INDETERMINATE, CHECKBOX_STATUS_UNCHECKED
      } = Const;

      if (_.isDefined(selectRow)) {
        let { mode } = selectRow;
        let checkedStatus;

        const allRowsSelected = data.length === selectedRowKeys.length;

        if (!mode || (mode !== ROW_SELECT_SINGLE && mode !== ROW_SELECT_MULTIPLE)) {
          mode = Const.ROW_SELECT_MULTIPLE;
        }

        // checkbox status depending on selected rows counts
        if (allRowsSelected) checkedStatus = CHECKBOX_STATUS_CHECKED;
        else if (selectedRowKeys.length === 0) checkedStatus = CHECKBOX_STATUS_UNCHECKED;
        else checkedStatus = CHECKBOX_STATUS_INDETERMINATE;

        return {
          ...selectRow,
          ...options,
          mode,
          checkedStatus
        };
      }

      return {
        mode: ROW_SELECT_DISABLED
      };
    }
  };
