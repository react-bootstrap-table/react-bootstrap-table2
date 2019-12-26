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
      colSpan: Number(column.colSpan) || 1,
      footer: column.footer,
      footerFormatter: column.footerFormatter
    }))
    .filter(_ => _.export);

export const transform = (
  data,
  meta,
  columns,
  _,
  {
    separator,
    ignoreHeader,
    ignoreFooter
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
        let cellContent = _.get(row, m.field);
        if (m.formatter) {
          cellContent = m.formatter(cellContent, row, rowIndex, m.formatExtraData);
        }
        if (m.type === String) {
          return `"${`${cellContent}`.replace(/"/g, '""')}"`;
        }
        return cellContent;
      }).join(separator)).join('\n');

  if (!ignoreFooter) {
    content += '\n';
    content += visibleColumns.map((m, i) => {
      if (typeof m.footer === 'function') {
        const columnData = _.pluck(data, columns[i].dataField);
        return `"${m.footer(columnData, columns[i], i)}"`;
      } else if (m.footerFormatter) {
        return `"${m.footerFormatter(columns[i], i)}"`;
      }
      return `"${m.footer}"`;
    }).join(separator);
  }
  return content;
};

export const save = (
  content,
  {
    noAutoBOM,
    fileName,
    blobType
  }
) => {
  FileSaver.saveAs(
    new Blob([content], { type: blobType }),
    fileName,
    noAutoBOM
  );
};
