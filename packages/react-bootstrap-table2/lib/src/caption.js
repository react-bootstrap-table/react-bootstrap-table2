"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint react/require-default-props: 0 */

var Caption = function Caption(props) {
  if (!props.children) return null;
  var caption = props.bootstrap4 ? /*#__PURE__*/_react["default"].createElement("caption", {
    style: {
      captionSide: 'top'
    }
  }, props.children) : /*#__PURE__*/_react["default"].createElement("caption", null, props.children);
  return caption;
};
Caption.propTypes = {
  children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  bootstrap4: _propTypes["default"].bool
};
var _default = Caption;
exports["default"] = _default;