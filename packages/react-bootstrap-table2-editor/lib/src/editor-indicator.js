"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint no-return-assign: 0 */
var EditorIndicator = function EditorIndicator(_ref) {
  var invalidMessage = _ref.invalidMessage;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "alert alert-danger in",
    role: "alert"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, invalidMessage));
};

EditorIndicator.propTypes = {
  invalidMessage: _propTypes["default"].string
};
EditorIndicator.defaultProps = {
  invalidMessage: null
};
var _default = EditorIndicator;
exports["default"] = _default;