"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RowSection = function RowSection(_ref) {
  var content = _ref.content,
      colSpan = _ref.colSpan;
  return /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    "data-toggle": "collapse",
    colSpan: colSpan,
    className: "react-bs-table-no-data"
  }, content));
};

RowSection.propTypes = {
  content: _propTypes["default"].any,
  colSpan: _propTypes["default"].number
};
RowSection.defaultProps = {
  content: null,
  colSpan: 1
};
var _default = RowSection;
exports["default"] = _default;