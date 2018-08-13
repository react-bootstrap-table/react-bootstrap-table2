import { getMetaInfo, transform, save } from '../csv/exporter';

const csvDefaultOptions = {
  fileName: 'spreadsheet.csv',
  separator: ',',
  ignoreHeader: false,
  noAutoBOM: true,
  exportAll: true
};

export default Base =>
  class CSVOperation extends Base {
    handleExportCSV = () => {
      const { columns, exportCSV } = this.props;
      const meta = getMetaInfo(columns);
      const options = exportCSV === true ?
        csvDefaultOptions :
        {
          ...csvDefaultOptions,
          ...exportCSV
        };

      const data = options.exportAll ? this.props.data : this.getData();
      const content = transform(data, meta, this._.get, options);
      save(content, options);
    }
  };
