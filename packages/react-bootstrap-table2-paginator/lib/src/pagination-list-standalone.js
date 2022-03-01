"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _paginationList = _interopRequireDefault(require("./pagination-list"));

var _standaloneAdapter = _interopRequireDefault(require("./standalone-adapter"));

var _paginationHandler = _interopRequireDefault(require("./pagination-handler"));

var _paginationListAdapter = _interopRequireDefault(require("./pagination-list-adapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PaginationListStandalone = function PaginationListStandalone(props) {
  return /*#__PURE__*/_react["default"].createElement(_paginationList["default"], props);
};

var _default = (0, _standaloneAdapter["default"])((0, _paginationHandler["default"])((0, _paginationListAdapter["default"])(PaginationListStandalone)));

exports["default"] = _default;