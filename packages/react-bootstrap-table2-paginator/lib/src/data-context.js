"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _const = _interopRequireDefault(require("./const"));
var _pagination = _interopRequireDefault(require("./pagination"));
var _page = require("./page");
var _stateContext = _interopRequireDefault(require("./state-context"));
var _excluded = ["page", "sizePerPage", "dataSize"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
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
var _createBaseContext = (0, _stateContext["default"])(),
  Provider = _createBaseContext.Provider;
var PaginationDataContext = /*#__PURE__*/_react["default"].createContext();
var PaginationDataProvider = /*#__PURE__*/function (_Provider) {
  _inherits(PaginationDataProvider, _Provider);
  var _super = _createSuper(PaginationDataProvider);
  function PaginationDataProvider() {
    var _this;
    _classCallCheck(this, PaginationDataProvider);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "isRemotePagination", function () {
      return _this.props.isRemotePagination();
    });
    _defineProperty(_assertThisInitialized(_this), "renderDefaultPagination", function () {
      if (!_this.props.pagination.options.custom) {
        var _this$getPaginationPr = _this.getPaginationProps(),
          currPage = _this$getPaginationPr.page,
          currSizePerPage = _this$getPaginationPr.sizePerPage,
          dataSize = _this$getPaginationPr.dataSize,
          rest = _objectWithoutProperties(_this$getPaginationPr, _excluded);
        return /*#__PURE__*/_react["default"].createElement(_pagination["default"], _extends({}, rest, {
          key: "pagination",
          dataSize: dataSize || _this.props.data.length,
          currPage: currPage,
          currSizePerPage: currSizePerPage
        }));
      }
      return null;
    });
    return _this;
  }
  _createClass(PaginationDataProvider, [{
    key: "UNSAFE_componentWillReceiveProps",
    value:
    // eslint-disable-next-line camelcase, react/sort-comp
    function UNSAFE_componentWillReceiveProps(nextProps) {
      _get(_getPrototypeOf(PaginationDataProvider.prototype), "UNSAFE_componentWillReceiveProps", this).call(this, nextProps);
      var currSizePerPage = this.currSizePerPage;
      var _nextProps$pagination = nextProps.pagination.options,
        custom = _nextProps$pagination.custom,
        onPageChange = _nextProps$pagination.onPageChange;
      var pageStartIndex = typeof nextProps.pagination.options.pageStartIndex !== 'undefined' ? nextProps.pagination.options.pageStartIndex : _const["default"].PAGE_START_INDEX;

      // user should align the page when the page is not fit to the data size when remote enable
      if (!this.isRemotePagination() && !custom) {
        var newPage = (0, _page.alignPage)(nextProps.data.length, this.props.data.length, this.currPage, currSizePerPage, pageStartIndex);
        if (this.currPage !== newPage) {
          if (onPageChange) {
            onPageChange(newPage, currSizePerPage);
          }
          this.currPage = newPage;
        }
      }
      if (nextProps.onDataSizeChange && nextProps.data.length !== this.props.data.length) {
        nextProps.onDataSizeChange({
          dataSize: nextProps.data.length
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.props.data;
      var options = this.props.pagination.options;
      var currPage = this.currPage,
        currSizePerPage = this.currSizePerPage;
      var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const["default"].PAGE_START_INDEX : options.pageStartIndex;
      data = this.isRemotePagination() ? data : (0, _page.getByCurrPage)(data, currPage, currSizePerPage, pageStartIndex);
      return /*#__PURE__*/_react["default"].createElement(PaginationDataContext.Provider, {
        value: {
          data: data,
          setRemoteEmitter: this.setRemoteEmitter
        }
      }, this.props.children, this.renderDefaultPagination());
    }
  }]);
  return PaginationDataProvider;
}(Provider);
_defineProperty(PaginationDataProvider, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  remoteEmitter: _propTypes["default"].object.isRequired,
  isRemotePagination: _propTypes["default"].func.isRequired
});
var _default = function _default() {
  return {
    Provider: PaginationDataProvider,
    Consumer: PaginationDataContext.Consumer
  };
};
exports["default"] = _default;