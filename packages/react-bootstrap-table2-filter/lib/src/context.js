"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _filter = require("./filter");
var _comparison = require("./comparison");
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _default = function _default(_, isRemoteFiltering, handleFilterChange) {
  var FilterContext = /*#__PURE__*/_react["default"].createContext();
  var FilterProvider = /*#__PURE__*/function (_React$Component) {
    _inherits(FilterProvider, _React$Component);
    var _super = _createSuper(FilterProvider);
    function FilterProvider(props) {
      var _this;
      _classCallCheck(this, FilterProvider);
      _this = _super.call(this, props);
      _this.currFilters = {};
      _this.clearFilters = {};
      _this.onFilter = _this.onFilter.bind(_assertThisInitialized(_this));
      _this.doFilter = _this.doFilter.bind(_assertThisInitialized(_this));
      _this.onExternalFilter = _this.onExternalFilter.bind(_assertThisInitialized(_this));
      _this.data = props.data;
      _this.isEmitDataChange = false;
      return _this;
    }
    _createClass(FilterProvider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (isRemoteFiltering() && Object.keys(this.currFilters).length > 0) {
          handleFilterChange(this.currFilters);
        }
      }
    }, {
      key: "onFilter",
      value: function onFilter(column, filterType) {
        var _this2 = this;
        var initialize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return function (filterVal) {
          // watch out here if migration to context API, #334
          var currFilters = Object.assign({}, _this2.currFilters);
          _this2.clearFilters = {};
          var dataField = column.dataField,
            filter = column.filter;
          var needClearFilters = !_.isDefined(filterVal) || filterVal === '' || filterVal.length === 0;
          if (needClearFilters) {
            delete currFilters[dataField];
            _this2.clearFilters = _defineProperty({}, dataField, {
              clear: true,
              filterVal: filterVal
            });
          } else {
            // select default comparator is EQ, others are LIKE
            var _filter$props = filter.props,
              _filter$props$compara = _filter$props.comparator,
              comparator = _filter$props$compara === void 0 ? filterType === _const.FILTER_TYPE.SELECT ? _comparison.EQ : _comparison.LIKE : _filter$props$compara,
              _filter$props$caseSen = _filter$props.caseSensitive,
              caseSensitive = _filter$props$caseSen === void 0 ? false : _filter$props$caseSen;
            currFilters[dataField] = {
              filterVal: filterVal,
              filterType: filterType,
              comparator: comparator,
              caseSensitive: caseSensitive
            };
          }
          _this2.currFilters = currFilters;
          if (isRemoteFiltering()) {
            if (!initialize) {
              handleFilterChange(_this2.currFilters);
            }
            return;
          }
          _this2.doFilter(_this2.props);
        };
      }
    }, {
      key: "onExternalFilter",
      value: function onExternalFilter(column, filterType) {
        var _this3 = this;
        return function (value) {
          _this3.onFilter(column, filterType)(value);
        };
      }
    }, {
      key: "getFiltered",
      value: function getFiltered() {
        return this.data;
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        // let nextData = nextProps.data;
        if (!isRemoteFiltering() && !_.isEqual(nextProps.data, this.data)) {
          this.doFilter(nextProps, this.isEmitDataChange);
        } else {
          this.data = nextProps.data;
        }
      }
    }, {
      key: "doFilter",
      value: function doFilter(props) {
        var ignoreEmitDataChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var dataChangeListener = props.dataChangeListener,
          data = props.data,
          columns = props.columns,
          filter = props.filter;
        var result = (0, _filter.filters)(data, columns, _)(this.currFilters, this.clearFilters);
        if (filter.afterFilter) {
          filter.afterFilter(result, this.currFilters);
        }
        this.data = result;
        if (dataChangeListener && !ignoreEmitDataChange) {
          this.isEmitDataChange = true;
          dataChangeListener.emit('filterChanged', result.length);
        } else {
          this.isEmitDataChange = false;
          this.forceUpdate();
        }
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(FilterContext.Provider, {
          value: {
            data: this.data,
            onFilter: this.onFilter,
            onExternalFilter: this.onExternalFilter,
            currFilters: this.currFilters
          }
        }, this.props.children);
      }
    }]);
    return FilterProvider;
  }(_react["default"].Component);
  _defineProperty(FilterProvider, "propTypes", {
    data: _propTypes["default"].array.isRequired,
    columns: _propTypes["default"].array.isRequired,
    dataChangeListener: _propTypes["default"].object
  });
  return {
    Provider: FilterProvider,
    Consumer: FilterContext.Consumer
  };
};
exports["default"] = _default;