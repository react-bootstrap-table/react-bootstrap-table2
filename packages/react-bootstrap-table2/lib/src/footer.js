"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rowTemplate = _interopRequireDefault(require("./row/row-template"));

var _footerCell = _interopRequireDefault(require("./footer-cell"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint react/require-default-props: 0 */
var Footer = function Footer(props) {
  var data = props.data,
      className = props.className,
      columns = props.columns,
      selectRow = props.selectRow,
      expandRow = props.expandRow;

  function renderContent() {
    return columns.map(function (column, i) {
      if (column.footer === undefined || column.footer === null) {
        return false;
      }

      var columnData = _utils["default"].pluck(data, column.dataField);

      return /*#__PURE__*/_react["default"].createElement(_footerCell["default"], {
        index: i,
        key: column.dataField,
        column: column,
        columnData: columnData
      });
    });
  }

  return /*#__PURE__*/_react["default"].createElement("tfoot", null, /*#__PURE__*/_react["default"].createElement(_rowTemplate["default"], {
    renderContent: renderContent,
    selectRow: selectRow,
    expandRow: expandRow,
    className: className,
    cellEl: "th"
  }));
};

Footer.propTypes = {
  data: _propTypes["default"].array,
  className: _propTypes["default"].string,
  columns: _propTypes["default"].array,
  selectRow: _propTypes["default"].object,
  expandRow: _propTypes["default"].object
};
var _default = Footer;
exports["default"] = _default;