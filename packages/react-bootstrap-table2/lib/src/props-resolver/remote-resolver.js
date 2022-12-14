"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events = _interopRequireDefault(require("events"));
var _utils = _interopRequireDefault(require("../utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
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
var _default = function _default(ExtendBase) {
  return /*#__PURE__*/function (_ExtendBase) {
    _inherits(RemoteResolver, _ExtendBase);
    var _super = _createSuper(RemoteResolver);
    function RemoteResolver(props) {
      var _this;
      _classCallCheck(this, RemoteResolver);
      _this = _super.call(this, props);
      _defineProperty(_assertThisInitialized(_this), "getNewestState", function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var sortOrder;
        var sortField;
        var page;
        var sizePerPage;
        var searchText;
        var filters = {};
        if (_this.sortContext) {
          sortOrder = _this.sortContext.state.sortOrder;
          sortField = _this.sortContext.state.sortColumn ? _this.sortContext.state.sortColumn.dataField : null;
        }
        if (_this.filterContext) {
          filters = _this.filterContext.currFilters;
        }
        if (_this.paginationContext) {
          page = _this.paginationContext.currPage;
          sizePerPage = _this.paginationContext.currSizePerPage;
        }
        if (_this.searchContext) {
          searchText = _this.props.search.searchText;
        }
        return _objectSpread(_objectSpread({
          sortOrder: sortOrder,
          sortField: sortField,
          filters: filters,
          page: page,
          sizePerPage: sizePerPage,
          searchText: searchText
        }, state), {}, {
          data: _this.props.data
        });
      });
      _defineProperty(_assertThisInitialized(_this), "isRemoteSearch", function () {
        var remote = _this.props.remote;
        return remote === true || _utils["default"].isObject(remote) && remote.search || _this.isRemotePagination();
      });
      _defineProperty(_assertThisInitialized(_this), "isRemotePagination", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var remote = _this.props.remote;
        e.result = remote === true || _utils["default"].isObject(remote) && remote.pagination;
        return e.result;
      });
      _defineProperty(_assertThisInitialized(_this), "isRemoteFiltering", function () {
        var remote = _this.props.remote;
        return remote === true || _utils["default"].isObject(remote) && remote.filter || _this.isRemotePagination();
      });
      _defineProperty(_assertThisInitialized(_this), "isRemoteSort", function () {
        var remote = _this.props.remote;
        return remote === true || _utils["default"].isObject(remote) && remote.sort || _this.isRemotePagination();
      });
      _defineProperty(_assertThisInitialized(_this), "isRemoteCellEdit", function () {
        var remote = _this.props.remote;
        return remote === true || _utils["default"].isObject(remote) && remote.cellEdit;
      });
      _defineProperty(_assertThisInitialized(_this), "handleRemotePageChange", function (page, sizePerPage) {
        _this.props.onTableChange('pagination', _this.getNewestState({
          page: page,
          sizePerPage: sizePerPage
        }));
      });
      _defineProperty(_assertThisInitialized(_this), "handleRemoteFilterChange", function (filters) {
        var newState = {
          filters: filters
        };
        if (_this.isRemotePagination()) {
          var options = _this.props.pagination.options || {};
          newState.page = _utils["default"].isDefined(options.pageStartIndex) ? options.pageStartIndex : 1;
        }
        _this.props.onTableChange('filter', _this.getNewestState(newState));
      });
      _defineProperty(_assertThisInitialized(_this), "handleRemoteSortChange", function (sortField, sortOrder) {
        _this.props.onTableChange('sort', _this.getNewestState({
          sortField: sortField,
          sortOrder: sortOrder
        }));
      });
      _defineProperty(_assertThisInitialized(_this), "handleRemoteCellChange", function (rowId, dataField, newValue) {
        var cellEdit = {
          rowId: rowId,
          dataField: dataField,
          newValue: newValue
        };
        _this.props.onTableChange('cellEdit', _this.getNewestState({
          cellEdit: cellEdit
        }));
      });
      _defineProperty(_assertThisInitialized(_this), "handleRemoteSearchChange", function (searchText) {
        _this.props.onTableChange('search', _this.getNewestState({
          searchText: searchText
        }));
      });
      _this.remoteEmitter = new _events["default"]();
      _this.remoteEmitter.on('paginationChange', _this.handleRemotePageChange);
      _this.remoteEmitter.on('isRemotePagination', _this.isRemotePagination);
      return _this;
    }
    return _createClass(RemoteResolver);
  }(ExtendBase);
};
exports["default"] = _default;