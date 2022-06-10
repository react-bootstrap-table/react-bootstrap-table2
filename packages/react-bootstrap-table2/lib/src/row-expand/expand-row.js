"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _excluded = ["children", "expanded", "onClosed", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ExpandRow = function ExpandRow(_ref) {
  var children = _ref.children,
      expanded = _ref.expanded,
      onClosed = _ref.onClosed,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", _extends({
    className: (0, _classnames["default"])('reset-expansion-style', className)
  }, rest), /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.CSSTransition, {
    appear: true,
    "in": expanded,
    timeout: 400,
    classNames: "row-expand-slide",
    onExited: onClosed
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row-expansion-style"
  }, children)))));
};

ExpandRow.propTypes = {
  children: _propTypes["default"].node,
  expanded: _propTypes["default"].bool,
  onClosed: _propTypes["default"].func,
  className: _propTypes["default"].string
};
ExpandRow.defaultProps = {
  children: null,
  expanded: false,
  onClosed: null,
  className: ''
};
var _default = ExpandRow;
exports["default"] = _default;