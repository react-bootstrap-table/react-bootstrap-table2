
export const matchRow = (keyField, id) => row => row[keyField] === id;

export const getRowByRowId = ({ data, keyField }) => id => data.find(matchRow(keyField, id));
