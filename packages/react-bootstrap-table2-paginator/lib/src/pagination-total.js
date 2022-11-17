"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PaginationTotal = function PaginationTotal(props) {
  if (props.paginationTotalRenderer) {
    return props.paginationTotalRenderer(props.from, props.to, props.dataSize);
  }
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "react-bootstrap-table-pagination-total"
  }, "\xA0Showing rows ", props.from, " to\xA0", props.to, " of\xA0", props.dataSize);
};
PaginationTotal.propTypes = {
  from: _propTypes["default"].number.isRequired,
  to: _propTypes["default"].number.isRequired,
  dataSize: _propTypes["default"].number.isRequired,
  paginationTotalRenderer: _propTypes["default"].func
};
PaginationTotal.defaultProps = {
  paginationTotalRenderer: undefined
};
var _default = PaginationTotal;
exports["default"] = _default;