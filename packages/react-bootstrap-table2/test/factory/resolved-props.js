import BootstrapTable from 'src/bootstrap-table';

const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}];

const data = [{
  id: 1,
  name: 'A'
}, {
  id: 2,
  name: 'B'
}];

const keyField = 'id';

const props = {
  columns,
  data,
  keyField
};

const bootstrapTable = new BootstrapTable(props);

export const bodyResolvedProps = () => ({
  cellEdit: bootstrapTable.resolveCellEditProps(),
  selectRow: bootstrapTable.resolveCellSelectionProps()
});

export const headerResolvedProps = () => ({
  selectRow: bootstrapTable.resolveHeaderCellSelectionProps()
});
