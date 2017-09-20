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
  };
