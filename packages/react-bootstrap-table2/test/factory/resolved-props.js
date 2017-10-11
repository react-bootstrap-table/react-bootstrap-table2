import BootstrapTable from 'src/bootstrap-table';
import { baseProps as props } from './base-props';

const bootstrapTable = new BootstrapTable(props);

export const bodyResolvedProps = () => ({
  cellEdit: bootstrapTable.resolveCellEditProps(),
  selectRow: bootstrapTable.resolveCellSelectionProps()
});

export const headerResolvedProps = () => ({
  selectRow: bootstrapTable.resolveHeaderCellSelectionProps()
});
