import ColumnResolver from './column-resolver';

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
  };
