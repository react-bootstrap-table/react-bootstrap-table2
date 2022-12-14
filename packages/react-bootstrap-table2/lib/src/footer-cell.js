"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = _interopRequireDefault(require("./utils"));
var _cellEventDelegater = _interopRequireDefault(require("./cell-event-delegater"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var FooterCell = /*#__PURE__*/function (_eventDelegater) {
  _inherits(FooterCell, _eventDelegater);
  var _super = _createSuper(FooterCell);
  function FooterCell() {
    _classCallCheck(this, FooterCell);
    return _super.apply(this, arguments);
  }
  _createClass(FooterCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        index = _this$props.index,
        column = _this$props.column,
        columnData = _this$props.columnData;
      var footer = column.footer,
        footerTitle = column.footerTitle,
        footerAlign = column.footerAlign,
        footerFormatter = column.footerFormatter,
        footerEvents = column.footerEvents,
        footerClasses = column.footerClasses,
        footerStyle = column.footerStyle,
        footerAttrs = column.footerAttrs;
      var delegateEvents = this.delegate(footerEvents);
      var cellAttrs = _objectSpread(_objectSpread({}, _utils["default"].isFunction(footerAttrs) ? footerAttrs(column, index) : footerAttrs), delegateEvents);
      var text = '';
      if (_utils["default"].isString(footer)) {
        text = footer;
      } else if (_utils["default"].isFunction(footer)) {
        text = footer(columnData, column, index);
      }
      var cellStyle = {};
      var cellClasses = _utils["default"].isFunction(footerClasses) ? footerClasses(column, index) : footerClasses;
      if (footerStyle) {
        cellStyle = _utils["default"].isFunction(footerStyle) ? footerStyle(column, index) : footerStyle;
        cellStyle = cellStyle ? _objectSpread({}, cellStyle) : cellStyle;
      }
      if (footerTitle) {
        cellAttrs.title = _utils["default"].isFunction(footerTitle) ? footerTitle(column, index) : text;
      }
      if (footerAlign) {
        cellStyle.textAlign = _utils["default"].isFunction(footerAlign) ? footerAlign(column, index) : footerAlign;
      }
      if (cellClasses) cellAttrs.className = (0, _classnames["default"])(cellAttrs.className, cellClasses);
      if (!_utils["default"].isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;
      var children = footerFormatter ? footerFormatter(column, index, {
        text: text
      }) : text;
      return /*#__PURE__*/_react["default"].createElement('th', cellAttrs, children);
    }
  }]);
  return FooterCell;
}((0, _cellEventDelegater["default"])(_react["default"].Component));
FooterCell.propTypes = {
  columnData: _propTypes["default"].array,
  index: _propTypes["default"].number,
  column: _propTypes["default"].object
};
var _default = FooterCell;
exports["default"] = _default;