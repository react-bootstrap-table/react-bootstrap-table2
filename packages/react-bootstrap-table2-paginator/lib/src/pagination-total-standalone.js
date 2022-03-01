"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _paginationTotal = _interopRequireDefault(require("./pagination-total"));

var _standaloneAdapter = _interopRequireDefault(require("./standalone-adapter"));

var _paginationTotalAdapter = _interopRequireDefault(require("./pagination-total-adapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PaginationTotalStandalone = function PaginationTotalStandalone(props) {
  return /*#__PURE__*/_react["default"].createElement(_paginationTotal["default"], props);
};

var _default = (0, _standaloneAdapter["default"])((0, _paginationTotalAdapter["default"])(PaginationTotalStandalone));

exports["default"] = _default;