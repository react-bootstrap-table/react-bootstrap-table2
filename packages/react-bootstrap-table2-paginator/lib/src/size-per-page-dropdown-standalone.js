"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _sizePerPageDropdown = _interopRequireDefault(require("./size-per-page-dropdown"));
var _standaloneAdapter = _interopRequireDefault(require("./standalone-adapter"));
var _paginationHandler = _interopRequireDefault(require("./pagination-handler"));
var _sizePerPageDropdownAdapter = _interopRequireDefault(require("./size-per-page-dropdown-adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SizePerPageDropdownStandalone = function SizePerPageDropdownStandalone(props) {
  return /*#__PURE__*/_react["default"].createElement(_sizePerPageDropdown["default"], props);
};
var _default = (0, _standaloneAdapter["default"])((0, _paginationHandler["default"])((0, _sizePerPageDropdownAdapter["default"])(SizePerPageDropdownStandalone)));
exports["default"] = _default;