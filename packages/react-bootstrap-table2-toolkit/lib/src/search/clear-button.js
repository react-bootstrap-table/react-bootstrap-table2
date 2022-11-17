"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ClearButton = function ClearButton(_ref) {
  var onClear = _ref.onClear,
    text = _ref.text,
    className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: "btn btn-default ".concat(className),
    onClick: onClear
  }, text);
};
ClearButton.propTypes = {
  onClear: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  text: _propTypes["default"].string
};
ClearButton.defaultProps = {
  text: 'Clear',
  className: ''
};
var _default = ClearButton;
exports["default"] = _default;