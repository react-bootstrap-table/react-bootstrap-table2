"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pageButton = _interopRequireDefault(require("./page-button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PaginatonList = function PaginatonList(props) {
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: "pagination react-bootstrap-table-page-btns-ul"
  }, props.pages.map(function (pageProps) {
    if (props.pageButtonRenderer) {
      return props.pageButtonRenderer(_objectSpread(_objectSpread({}, pageProps), {}, {
        onPageChange: props.onPageChange
      }));
    }
    return /*#__PURE__*/_react["default"].createElement(_pageButton["default"], _extends({
      key: pageProps.page
    }, pageProps, {
      onPageChange: props.onPageChange
    }));
  }));
};
PaginatonList.propTypes = {
  pages: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    page: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].number, _propTypes["default"].string]),
    active: _propTypes["default"].bool,
    disable: _propTypes["default"].bool,
    title: _propTypes["default"].string
  })).isRequired,
  onPageChange: _propTypes["default"].func.isRequired,
  pageButtonRenderer: _propTypes["default"].func
};
PaginatonList.defaultProps = {
  pageButtonRenderer: null
};
var _default = PaginatonList;
exports["default"] = _default;