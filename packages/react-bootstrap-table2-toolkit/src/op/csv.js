import { getMetaInfo, transform, save } from '../csv/exporter';

const csvDefaultOptions = {
  fileName: 'spreadsheet.csv',
  separator: ',',
  ignoreHeader: false,
  noAutoBOM: true
};

export default Base =>
  class CSVOperation extends Base {
    handleExportCSV = () => {
      const { columns, data, exportCSV } = this.props;
      const meta = getMetaInfo(columns);
      const options = exportCSV === true ?
        csvDefaultOptions :
        {
          ...csvDefaultOptions,
          ...exportCSV
        };
      const content = transform(data, meta, options);
      save(content, options);
    }
  };
