import { getMetaInfo, transform, save } from '../csv/exporter';

const csvDefaultOptions = {
  fileName: 'spreadsheet.csv',
  separator: ',',
  ignoreHeader: false,
  noAutoBOM: true,
  exportAll: true,
  onlyExportSelection: false
};

export default Base =>
  class CSVOperation extends Base {
    handleExportCSV = (source) => {
      const { columns, exportCSV, keyField } = this.props;
      const meta = getMetaInfo(columns);
      const options = exportCSV === true ?
        csvDefaultOptions :
        {
          ...csvDefaultOptions,
          ...exportCSV
        };

      // get data for csv export
      let data;
      if (typeof source !== 'undefined') {
        data = source;
      } else {
        data = options.exportAll ? this.props.data : this.getData();
      }

      // filter data
      if (options.onlyExportSelection) {
        const selections = this.getSelected();
        data = data.filter(row => !!selections.find(sel => row[keyField] === sel));
      }
      const content = transform(data, meta, this._.get, options);
      save(content, options);
    }
  };
