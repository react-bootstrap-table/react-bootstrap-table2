"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = _interopRequireDefault(require("../utils"));

var _selectionContext = _interopRequireDefault(require("../contexts/selection-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(Component) {
  var renderWithSelection = function renderWithSelection(props, selectRow) {
    var key = props.value;

    var selected = _utils["default"].contains(selectRow.selected, key);

    var selectable = !selectRow.nonSelectable || !_utils["default"].contains(selectRow.nonSelectable, key);

    var notSelectable = _utils["default"].contains(selectRow.nonSelectable, key);

    var style = props.style,
        className = props.className;

    if (selected) {
      var selectedStyle = _utils["default"].isFunction(selectRow.style) ? selectRow.style(props.row, props.rowIndex) : selectRow.style;
      var selectedClasses = _utils["default"].isFunction(selectRow.classes) ? selectRow.classes(props.row, props.rowIndex) : selectRow.classes;
      style = _objectSpread(_objectSpread({}, style), selectedStyle);
      className = (0, _classnames["default"])(className, selectedClasses) || undefined;

      if (selectRow.bgColor) {
        style = style || {};
        style.backgroundColor = _utils["default"].isFunction(selectRow.bgColor) ? selectRow.bgColor(props.row, props.rowIndex) : selectRow.bgColor;
      }
    }

    if (notSelectable) {
      var notSelectableStyle = _utils["default"].isFunction(selectRow.nonSelectableStyle) ? selectRow.nonSelectableStyle(props.row, props.rowIndex) : selectRow.nonSelectableStyle;
      var notSelectableClasses = _utils["default"].isFunction(selectRow.nonSelectableClasses) ? selectRow.nonSelectableClasses(props.row, props.rowIndex) : selectRow.nonSelectableClasses;
      style = _objectSpread(_objectSpread({}, style), notSelectableStyle);
      className = (0, _classnames["default"])(className, notSelectableClasses) || undefined;
    }

    return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, props, {
      style: style,
      className: className,
      selectRow: selectRow,
      selected: selected,
      selectable: selectable
    }));
  };

  function withConsumer(props) {
    return /*#__PURE__*/_react["default"].createElement(_selectionContext["default"].Consumer, null, function (selectRow) {
      return renderWithSelection(props, selectRow);
    });
  }

  withConsumer.displayName = 'WithSelectionRowConsumer';
  return withConsumer;
};

exports["default"] = _default;