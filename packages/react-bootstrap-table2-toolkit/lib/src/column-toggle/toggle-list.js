"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var ToggleList = function ToggleList(_ref) {
  var columns = _ref.columns,
    onColumnToggle = _ref.onColumnToggle,
    toggles = _ref.toggles,
    contextual = _ref.contextual,
    className = _ref.className,
    btnClassName = _ref.btnClassName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn-group btn-group-toggle ".concat(className),
    "data-toggle": "buttons"
  }, columns.map(function (column) {
    return _objectSpread(_objectSpread({}, column), {}, {
      toggle: toggles[column.dataField]
    });
  }).map(function (column) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      key: column.dataField,
      className: "".concat(btnClassName, " btn btn-").concat(contextual, " ").concat(column.toggle ? 'active' : ''),
      "data-toggle": "button",
      "aria-pressed": column.toggle ? 'true' : 'false',
      onClick: function onClick() {
        return onColumnToggle(column.dataField);
      }
    }, column.text);
  }));
};
ToggleList.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  toggles: _propTypes["default"].object.isRequired,
  onColumnToggle: _propTypes["default"].func.isRequired,
  btnClassName: _propTypes["default"].string,
  className: _propTypes["default"].string,
  contextual: _propTypes["default"].string
};
ToggleList.defaultProps = {
  btnClassName: '',
  className: '',
  contextual: 'primary'
};
var _default = ToggleList;
exports["default"] = _default;