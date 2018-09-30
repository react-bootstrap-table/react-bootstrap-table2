/* eslint no-unneeded-ternary: 0 */
import FileSaver from 'file-saver';

export const getMetaInfo = columns =>
  columns
    .map(column => ({
      field: column.dataField,
      type: column.csvType || String,
      formatter: column.csvFormatter,
      formatExtraData: column.formatExtraData,
      header: column.csvText || column.text,
      export: column.csvExport === false ? false : true,
      row: Number(column.row) || 0,
      rowSpan: Number(column.rowSpan) || 1,
      colSpan: Number(column.colSpan) || 1
    }))
    .filter(_ => _.export);

export const transform = (
  data,
  meta,
  getValue,
  {
    separator,
    ignoreHeader
  }
) => {
  const visibleColumns = meta.filter(m => m.export);
  let content = '';
  // extract csv header
  if (!ignoreHeader) {
    content += visibleColumns.map(m => `"${m.header}"`).join(separator);
    content += '\n';
  }
  // extract csv body
  if (data.length === 0) return content;
  content += data
    .map((row, rowIndex) =>
      visibleColumns.map((m) => {
        let cellContent = getValue(row, m.field);
        if (m.formatter) {
          cellContent = m.formatter(cellContent, row, rowIndex, m.formatExtraData);
        }
        if (m.type === String) {
          return `"${cellContent}"`;
        }
        return cellContent;
      }).join(separator)).join('\n');

  return content;
};

export const save = (
  content,
  {
    noAutoBOM,
    fileName
  }
) => {
  FileSaver.saveAs(
    new Blob([content], { type: 'text/plain;charset=utf-8' }),
    fileName,
    noAutoBOM
  );
};
