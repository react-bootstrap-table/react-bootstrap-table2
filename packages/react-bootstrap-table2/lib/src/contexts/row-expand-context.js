"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _operators = _interopRequireDefault(require("../store/operators"));
var _utils = _interopRequireDefault(require("../utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
var RowExpandContext = /*#__PURE__*/_react["default"].createContext();
var RowExpandProvider = /*#__PURE__*/function (_React$Component) {
  _inherits(RowExpandProvider, _React$Component);
  var _super = _createSuper(RowExpandProvider);
  function RowExpandProvider() {
    var _this;
    _classCallCheck(this, RowExpandProvider);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      expanded: _this.props.expandRow.expanded || [],
      isClosing: _this.props.expandRow.isClosing || []
    });
    _defineProperty(_assertThisInitialized(_this), "onClosed", function (closedRow) {
      _this.setState({
        isClosing: _this.state.isClosing.filter(function (value) {
          return value !== closedRow;
        })
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleRowExpand", function (rowKey, expanded, rowIndex, e) {
      var _this$props = _this.props,
        data = _this$props.data,
        keyField = _this$props.keyField,
        _this$props$expandRow = _this$props.expandRow,
        onExpand = _this$props$expandRow.onExpand,
        onlyOneExpanding = _this$props$expandRow.onlyOneExpanding,
        nonExpandable = _this$props$expandRow.nonExpandable;
      if (nonExpandable && _utils["default"].contains(nonExpandable, rowKey)) {
        return;
      }
      var currExpanded = _toConsumableArray(_this.state.expanded);
      var isClosing = _toConsumableArray(_this.state.isClosing);
      if (expanded) {
        if (onlyOneExpanding) {
          isClosing = isClosing.concat(currExpanded);
          currExpanded = [rowKey];
        } else currExpanded.push(rowKey);
      } else {
        isClosing.push(rowKey);
        currExpanded = currExpanded.filter(function (value) {
          return value !== rowKey;
        });
      }
      if (onExpand) {
        var row = _operators["default"].getRowByRowId(data, keyField, rowKey);
        onExpand(row, expanded, rowIndex, e);
      }
      _this.setState(function () {
        return {
          expanded: currExpanded,
          isClosing: isClosing
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleAllRowExpand", function (e, expandAll) {
      var _this$props2 = _this.props,
        data = _this$props2.data,
        keyField = _this$props2.keyField,
        _this$props2$expandRo = _this$props2.expandRow,
        onExpandAll = _this$props2$expandRo.onExpandAll,
        nonExpandable = _this$props2$expandRo.nonExpandable;
      var expanded = _this.state.expanded;
      var currExpanded;
      if (expandAll) {
        currExpanded = expanded.concat(_operators["default"].expandableKeys(data, keyField, nonExpandable));
      } else {
        currExpanded = expanded.filter(function (s) {
          return typeof data.find(function (d) {
            return _utils["default"].get(d, keyField) === s;
          }) === 'undefined';
        });
      }
      if (onExpandAll) {
        onExpandAll(expandAll, _operators["default"].getExpandedRows(data, keyField, currExpanded), e);
      }
      _this.setState(function () {
        return {
          expanded: currExpanded
        };
      });
    });
    return _this;
  }
  _createClass(RowExpandProvider, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;
      if (nextProps.expandRow) {
        var nextExpanded = _toConsumableArray(nextProps.expandRow.expanded || this.state.expanded);
        var _nextProps$expandRow$ = nextProps.expandRow.nonExpandable,
          nonExpandable = _nextProps$expandRow$ === void 0 ? [] : _nextProps$expandRow$;
        nextExpanded = nextExpanded.filter(function (rowId) {
          return !_utils["default"].contains(nonExpandable, rowId);
        });
        var isClosing = this.state.expanded.reduce(function (acc, cur) {
          if (!_utils["default"].contains(nextExpanded, cur)) {
            acc.push(cur);
          }
          return acc;
        }, []);
        this.setState(function () {
          return {
            expanded: nextExpanded,
            isClosing: isClosing
          };
        });
      } else {
        this.setState(function () {
          return {
            expanded: _this2.state.expanded
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        data = _this$props3.data,
        keyField = _this$props3.keyField;
      return /*#__PURE__*/_react["default"].createElement(RowExpandContext.Provider, {
        value: _objectSpread(_objectSpread({}, this.props.expandRow), {}, {
          nonExpandable: this.props.expandRow.nonExpandable,
          expanded: this.state.expanded,
          isClosing: this.state.isClosing,
          onClosed: this.onClosed,
          isAnyExpands: _operators["default"].isAnyExpands(data, keyField, this.state.expanded),
          onRowExpand: this.handleRowExpand,
          onAllRowExpand: this.handleAllRowExpand
        })
      }, this.props.children);
    }
  }]);
  return RowExpandProvider;
}(_react["default"].Component);
_defineProperty(RowExpandProvider, "propTypes", {
  children: _propTypes["default"].node.isRequired,
  data: _propTypes["default"].array.isRequired,
  keyField: _propTypes["default"].string.isRequired
});
var _default = {
  Provider: RowExpandProvider,
  Consumer: RowExpandContext.Consumer
};
exports["default"] = _default;