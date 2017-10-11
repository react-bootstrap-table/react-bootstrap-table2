export const baseColumns = () => [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}];

export const baseColumn = () => ({ dataField: 'id', text: 'ID' });

export const baseData = () => [{
  id: 1,
  name: 'A'
}, {
  id: 2,
  name: 'B'
}];

export const baseRow = () => ({ id: 1, name: 'A' });

export const baseKeyField = () => 'id';

/**
 * baseProps contains those basical props marked as `required` in BootstrapTable
 */
export const baseProps = {
  columns: baseColumns(),
  data: baseData(),
  keyField: baseKeyField()
};
