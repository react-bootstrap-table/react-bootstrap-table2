"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _statelessOp = _interopRequireDefault(require("./statelessOp"));
var _context = _interopRequireDefault(require("./src/search/context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var ToolkitContext = /*#__PURE__*/_react["default"].createContext();
var ToolkitProvider = /*#__PURE__*/function (_statelessDecorator) {
  _inherits(ToolkitProvider, _statelessDecorator);
  var _super = _createSuper(ToolkitProvider);
  function ToolkitProvider(props) {
    var _this;
    _classCallCheck(this, ToolkitProvider);
    _this = _super.call(this, props);
    var state = {};
    _this._ = null;
    _this.onClear = _this.onClear.bind(_assertThisInitialized(_this));
    _this.onSearch = _this.onSearch.bind(_assertThisInitialized(_this));
    _this.onColumnToggle = _this.onColumnToggle.bind(_assertThisInitialized(_this));
    _this.setDependencyModules = _this.setDependencyModules.bind(_assertThisInitialized(_this));
    if (props.columnToggle) {
      state.columnToggle = props.columns.reduce(function (obj, column) {
        obj[column.dataField] = !column.hidden;
        return obj;
      }, {});
    }
    state.searchText = _typeof(props.search) === 'object' ? props.search.defaultSearch || '' : '';
    _this.state = state;
    return _this;
  }

  // eslint-disable-next-line camelcase
  _createClass(ToolkitProvider, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var columnToggle = this.state.columnToggle;
      if (nextProps.columnToggle) {
        columnToggle = nextProps.columns.reduce(function (obj, column) {
          obj[column.dataField] = !column.hidden;
          return obj;
        }, {});
      } else {
        columnToggle = null;
      }
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        columnToggle: columnToggle
      }));
    }
  }, {
    key: "onSearch",
    value: function onSearch(searchText) {
      if (searchText !== this.state.searchText) {
        this.setState({
          searchText: searchText
        });
      }
    }
  }, {
    key: "onClear",
    value: function onClear() {
      this.setState({
        searchText: ''
      });
    }
  }, {
    key: "onColumnToggle",
    value: function onColumnToggle(dataField) {
      var columnToggle = this.state.columnToggle;
      columnToggle[dataField] = !columnToggle[dataField];
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        columnToggle: columnToggle
      }));
    }
    /**
     * 
     * @param {*} _ 
     * this function will be called only one time when table render
     * react-bootstrap-table-next/src/context/index.js will call this cb for passing the _ module
     * Please consider to extract a common module to handle _ module.
     * this is just a quick fix
     */
  }, {
    key: "setDependencyModules",
    value: function setDependencyModules(_) {
      this._ = _;
    }
  }, {
    key: "render",
    value: function render() {
      var baseProps = {
        keyField: this.props.keyField,
        columns: this.props.columns,
        data: this.props.data,
        bootstrap4: this.props.bootstrap4,
        setDependencyModules: this.setDependencyModules,
        registerExposedAPI: this.registerExposedAPI
      };
      if (this.props.search) {
        baseProps.search = {
          searchContext: (0, _context["default"])(this.props.search),
          searchText: this.state.searchText
        };
      }
      if (this.props.columnToggle) {
        baseProps.columnToggle = {
          toggles: this.state.columnToggle
        };
      }
      return /*#__PURE__*/_react["default"].createElement(ToolkitContext.Provider, {
        value: {
          searchProps: {
            searchText: this.state.searchText,
            onSearch: this.onSearch,
            onClear: this.onClear
          },
          csvProps: {
            onExport: this.handleExportCSV
          },
          columnToggleProps: {
            columns: this.props.columns,
            toggles: this.state.columnToggle,
            onColumnToggle: this.onColumnToggle
          },
          baseProps: baseProps
        }
      }, this.props.children);
    }
  }]);
  return ToolkitProvider;
}((0, _statelessOp["default"])(_react["default"].Component));
_defineProperty(ToolkitProvider, "propTypes", {
  keyField: _propTypes["default"].string.isRequired,
  data: _propTypes["default"].array.isRequired,
  columns: _propTypes["default"].array.isRequired,
  children: _propTypes["default"].node.isRequired,
  bootstrap4: _propTypes["default"].bool,
  search: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
    defaultSearch: _propTypes["default"].string,
    searchFormatted: _propTypes["default"].bool
  })]),
  exportCSV: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
    fileName: _propTypes["default"].string,
    separator: _propTypes["default"].string,
    ignoreHeader: _propTypes["default"].bool,
    ignoreFooter: _propTypes["default"].bool,
    noAutoBOM: _propTypes["default"].bool,
    blobType: _propTypes["default"].string,
    exportAll: _propTypes["default"].bool,
    onlyExportFiltered: _propTypes["default"].bool,
    onlyExportSelection: _propTypes["default"].bool
  })])
});
_defineProperty(ToolkitProvider, "defaultProps", {
  search: false,
  exportCSV: false,
  bootstrap4: false
});
var _default = {
  Provider: ToolkitProvider,
  Consumer: ToolkitContext.Consumer
};
exports["default"] = _default;