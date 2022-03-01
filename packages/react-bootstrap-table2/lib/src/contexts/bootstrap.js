"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BootstrapContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BootstrapContext = /*#__PURE__*/_react["default"].createContext({
  bootstrap4: false
});

exports.BootstrapContext = BootstrapContext;