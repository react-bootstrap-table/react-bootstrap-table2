import ColumnResolver from './column-resolver';

export default ExtendBase =>
  class TableResolver extends ColumnResolver(ExtendBase) {
    validateProps() {
      const { keyField } = this.props;
      if (!keyField) {
        throw new Error('Please specify a field as key via keyField');
      }
      if (this.visibleColumnSize(false) <= 0) {
        throw new Error('No visible columns detected');
      }
    }

    isEmpty() {
      return this.props.data.length === 0;
    }
  };
