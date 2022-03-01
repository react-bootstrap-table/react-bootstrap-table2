"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.save = exports.getMetaInfo = void 0;

var _fileSaver = _interopRequireDefault(require("file-saver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint no-unneeded-ternary: 0 */
var getMetaInfo = function getMetaInfo(columns) {
  return columns.map(function (column) {
    return {
      field: column.dataField,
      type: column.csvType || String,
      formatter: column.csvFormatter,
      formatExtraData: column.formatExtraData,
      header: column.csvText || column.text,
      "export": column.csvExport === false ? false : true,
      row: Number(column.row) || 0,
      rowSpan: Number(column.rowSpan) || 1,
      colSpan: Number(column.colSpan) || 1,
      footer: column.footer,
      footerFormatter: column.footerFormatter
    };
  }).filter(function (_) {
    return _["export"];
  });
};

exports.getMetaInfo = getMetaInfo;

var transform = function transform(data, meta, columns, _, _ref) {
  var separator = _ref.separator,
      ignoreHeader = _ref.ignoreHeader,
      ignoreFooter = _ref.ignoreFooter;
  var visibleColumns = meta.filter(function (m) {
    return m["export"];
  });
  var content = ''; // extract csv header

  if (!ignoreHeader) {
    content += visibleColumns.map(function (m) {
      return "\"".concat(m.header, "\"");
    }).join(separator);
    content += '\n';
  } // extract csv body


  if (data.length === 0) return content;
  content += data.map(function (row, rowIndex) {
    return visibleColumns.map(function (m) {
      var cellContent = _.get(row, m.field);

      if (m.formatter) {
        cellContent = m.formatter(cellContent, row, rowIndex, m.formatExtraData);
      }

      if (m.type === String) {
        return "\"".concat("".concat(cellContent).replace(/"/g, '""'), "\"");
      }

      return cellContent;
    }).join(separator);
  }).join('\n');

  if (!ignoreFooter) {
    content += '\n';
    content += visibleColumns.map(function (m, i) {
      if (typeof m.footer === 'function') {
        var columnData = _.pluck(data, columns[i].dataField);

        return "\"".concat(m.footer(columnData, columns[i], i), "\"");
      } else if (m.footerFormatter) {
        return "\"".concat(m.footerFormatter(columns[i], i), "\"");
      }

      return "\"".concat(m.footer, "\"");
    }).join(separator);
  }

  return content;
};

exports.transform = transform;

var save = function save(content, _ref2) {
  var noAutoBOM = _ref2.noAutoBOM,
      fileName = _ref2.fileName,
      blobType = _ref2.blobType;

  _fileSaver["default"].saveAs(new Blob([content], {
    type: blobType
  }), fileName, noAutoBOM);
};

exports.save = save;