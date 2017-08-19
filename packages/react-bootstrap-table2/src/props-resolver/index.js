import { columnSize } from './column-resolver';

export default ExtendBase =>
  class TableResolver extends ExtendBase {
    validateProps() {
      const { columns, keyField } = this.props;
      if (!keyField) {
        throw new Error('Please specify a field as key via keyField');
      }
      if (columnSize(columns) <= 0) {
        throw new Error('No any visible columns detect');
      }
    }
  };
