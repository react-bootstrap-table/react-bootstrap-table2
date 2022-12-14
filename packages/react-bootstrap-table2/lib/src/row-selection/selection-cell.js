"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _const = _interopRequireDefault(require("../const"));
var _utils = _interopRequireDefault(require("../utils"));
var _bootstrap = require("../contexts/bootstrap");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SelectionCell = /*#__PURE__*/function (_Component) {
  _inherits(SelectionCell, _Component);
  var _super = _createSuper(SelectionCell);
  function SelectionCell() {
    var _this;
    _classCallCheck(this, SelectionCell);
    _this = _super.call(this);
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(SelectionCell, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var shouldUpdate = this.props.rowIndex !== nextProps.rowIndex || this.props.selected !== nextProps.selected || this.props.disabled !== nextProps.disabled || this.props.rowKey !== nextProps.rowKey || this.props.tabIndex !== nextProps.tabIndex || this.props.selectColumnStyle !== nextProps.selectColumnStyle;
      return shouldUpdate;
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var _this$props = this.props,
        inputType = _this$props.mode,
        rowKey = _this$props.rowKey,
        selected = _this$props.selected,
        onRowSelect = _this$props.onRowSelect,
        disabled = _this$props.disabled,
        rowIndex = _this$props.rowIndex;
      e.stopPropagation();
      if (disabled) return;
      var checked = inputType === _const["default"].ROW_SELECT_SINGLE ? true : !selected;
      onRowSelect(rowKey, checked, rowIndex, e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        rowKey = _this$props2.rowKey,
        inputType = _this$props2.mode,
        selected = _this$props2.selected,
        disabled = _this$props2.disabled,
        tabIndex = _this$props2.tabIndex,
        rowIndex = _this$props2.rowIndex,
        selectionRenderer = _this$props2.selectionRenderer,
        selectColumnStyle = _this$props2.selectColumnStyle;
      var attrs = {};
      if (tabIndex !== -1) attrs.tabIndex = tabIndex;
      attrs.style = _utils["default"].isFunction(selectColumnStyle) ? selectColumnStyle({
        checked: selected,
        disabled: disabled,
        rowIndex: rowIndex,
        rowKey: rowKey
      }) : selectColumnStyle;
      return /*#__PURE__*/_react["default"].createElement(_bootstrap.BootstrapContext.Consumer, null, function (_ref) {
        var bootstrap4 = _ref.bootstrap4;
        return /*#__PURE__*/_react["default"].createElement("td", _extends({
          className: "selection-cell",
          onClick: _this2.handleClick
        }, attrs), selectionRenderer ? selectionRenderer({
          mode: inputType,
          checked: selected,
          disabled: disabled,
          rowIndex: rowIndex,
          rowKey: rowKey
        }) : /*#__PURE__*/_react["default"].createElement("input", {
          type: inputType,
          checked: selected,
          disabled: disabled,
          className: bootstrap4 ? 'selection-input-4' : '',
          onChange: function onChange() {}
        }));
      });
    }
  }]);
  return SelectionCell;
}(_react.Component);
exports["default"] = SelectionCell;
_defineProperty(SelectionCell, "propTypes", {
  mode: _propTypes["default"].string.isRequired,
  rowKey: _propTypes["default"].any,
  selected: _propTypes["default"].bool,
  onRowSelect: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  rowIndex: _propTypes["default"].number,
  tabIndex: _propTypes["default"].number,
  clickToSelect: _propTypes["default"].bool,
  selectionRenderer: _propTypes["default"].func,
  selectColumnStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func])
});