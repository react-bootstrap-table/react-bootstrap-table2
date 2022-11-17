"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _context = _interopRequireDefault(require("./context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Toolkitprovider = function Toolkitprovider(props) {
  return /*#__PURE__*/_react["default"].createElement(_context["default"].Provider, props, /*#__PURE__*/_react["default"].createElement(_context["default"].Consumer, null, function (tookKitProps) {
    return props.children(tookKitProps);
  }));
};
Toolkitprovider.propTypes = {
  children: _propTypes["default"].func.isRequired
};
var _default = Toolkitprovider;
exports["default"] = _default;