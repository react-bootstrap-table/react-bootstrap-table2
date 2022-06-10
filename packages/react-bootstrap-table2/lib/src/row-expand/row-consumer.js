"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _expandRow = _interopRequireDefault(require("./expand-row"));

var _utils = _interopRequireDefault(require("../utils"));

var _rowExpandContext = _interopRequireDefault(require("../contexts/row-expand-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(Component) {
  var renderWithExpansion = function renderWithExpansion(props, expandRow) {
    var parentClassName = '';
    var className = '';
    var key = props.value;

    var expanded = _utils["default"].contains(expandRow.expanded, key);

    var isClosing = _utils["default"].contains(expandRow.isClosing, key);

    var expandable = !expandRow.nonExpandable || !_utils["default"].contains(expandRow.nonExpandable, key);

    if (expanded) {
      parentClassName = _utils["default"].isFunction(expandRow.parentClassName) ? expandRow.parentClassName(expanded, props.row, props.rowIndex) : expandRow.parentClassName || '';
      className = _utils["default"].isFunction(expandRow.className) ? expandRow.className(expanded, props.row, props.rowIndex) : expandRow.className || '';
    }

    return [/*#__PURE__*/_react["default"].createElement(Component, _extends({}, props, {
      key: key,
      expanded: expanded,
      expandable: expandable,
      expandRow: _objectSpread({}, expandRow),
      className: (0, _classnames["default"])(props.className, parentClassName)
    })), expanded || isClosing ? /*#__PURE__*/_react["default"].createElement(_expandRow["default"], {
      key: "".concat(key, "-expanding"),
      colSpan: props.visibleColumnSize,
      expanded: expanded,
      onClosed: function onClosed() {
        return expandRow.onClosed(key);
      },
      className: className
    }, expandRow.renderer(props.row, props.rowIndex)) : null];
  };

  return function (props) {
    return /*#__PURE__*/_react["default"].createElement(_rowExpandContext["default"].Consumer, null, function (expandRow) {
      return renderWithExpansion(props, expandRow);
    });
  };
};

exports["default"] = _default;