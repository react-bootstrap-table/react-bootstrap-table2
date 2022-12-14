"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pageResolver2 = _interopRequireDefault(require("./page-resolver"));
var _paginationHandler = _interopRequireDefault(require("./pagination-handler"));
var _sizePerPageDropdownAdapter = require("./size-per-page-dropdown-adapter");
var _paginationListAdapter = require("./pagination-list-adapter");
var _paginationTotalAdapter = require("./pagination-total-adapter");
var _const = _interopRequireDefault(require("./const"));
var _excluded = ["tableId", "currPage", "pageStartIndex", "showTotal", "dataSize", "pageListRenderer", "pageButtonRenderer", "paginationTotalRenderer", "hidePageListOnlyOnePage", "totalPages", "lastPage", "onPageChange", "sizePerPageList", "currSizePerPage", "hideSizePerPage", "sizePerPageRenderer", "sizePerPageOptionRenderer", "onSizePerPageChange", "bootstrap4"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
var Pagination = /*#__PURE__*/function (_pageResolver) {
  _inherits(Pagination, _pageResolver);
  var _super = _createSuper(Pagination);
  function Pagination() {
    _classCallCheck(this, Pagination);
    return _super.apply(this, arguments);
  }
  _createClass(Pagination, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        tableId = _this$props.tableId,
        currPage = _this$props.currPage,
        pageStartIndex = _this$props.pageStartIndex,
        showTotal = _this$props.showTotal,
        dataSize = _this$props.dataSize,
        pageListRenderer = _this$props.pageListRenderer,
        pageButtonRenderer = _this$props.pageButtonRenderer,
        paginationTotalRenderer = _this$props.paginationTotalRenderer,
        hidePageListOnlyOnePage = _this$props.hidePageListOnlyOnePage,
        totalPages = _this$props.totalPages,
        lastPage = _this$props.lastPage,
        onPageChange = _this$props.onPageChange,
        sizePerPageList = _this$props.sizePerPageList,
        currSizePerPage = _this$props.currSizePerPage,
        hideSizePerPage = _this$props.hideSizePerPage,
        sizePerPageRenderer = _this$props.sizePerPageRenderer,
        sizePerPageOptionRenderer = _this$props.sizePerPageOptionRenderer,
        onSizePerPageChange = _this$props.onSizePerPageChange,
        bootstrap4 = _this$props.bootstrap4,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var pages = this.calculatePageStatus(this.calculatePages(totalPages, lastPage), lastPage);
      var pageListClass = (0, _classnames["default"])('react-bootstrap-table-pagination-list', 'col-md-6 col-xs-6 col-sm-6 col-lg-6', {
        'react-bootstrap-table-pagination-list-hidden': hidePageListOnlyOnePage && totalPages === 1
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "row react-bootstrap-table-pagination"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-md-6 col-xs-6 col-sm-6 col-lg-6"
      }, /*#__PURE__*/_react["default"].createElement(_sizePerPageDropdownAdapter.SizePerPageDropdownWithAdapter, {
        bootstrap4: bootstrap4,
        tableId: tableId,
        sizePerPageList: sizePerPageList,
        currSizePerPage: currSizePerPage,
        hideSizePerPage: hideSizePerPage,
        sizePerPageRenderer: sizePerPageRenderer,
        sizePerPageOptionRenderer: sizePerPageOptionRenderer,
        onSizePerPageChange: onSizePerPageChange
      }), showTotal ? /*#__PURE__*/_react["default"].createElement(_paginationTotalAdapter.PaginationTotalWithAdapter, {
        currPage: currPage,
        currSizePerPage: currSizePerPage,
        pageStartIndex: pageStartIndex,
        dataSize: dataSize,
        paginationTotalRenderer: paginationTotalRenderer
      }) : null), pageListRenderer ? pageListRenderer({
        pages: pages,
        onPageChange: onPageChange
      }) : /*#__PURE__*/_react["default"].createElement("div", {
        className: pageListClass
      }, /*#__PURE__*/_react["default"].createElement(_paginationListAdapter.PaginationListWithAdapter, _extends({}, rest, {
        currPage: currPage,
        currSizePerPage: currSizePerPage,
        pageStartIndex: pageStartIndex,
        lastPage: lastPage,
        totalPages: totalPages,
        pageButtonRenderer: pageButtonRenderer,
        onPageChange: onPageChange
      }))));
    }
  }]);
  return Pagination;
}((0, _pageResolver2["default"])(_react.Component));
Pagination.propTypes = {
  dataSize: _propTypes["default"].number.isRequired,
  sizePerPageList: _propTypes["default"].array.isRequired,
  currPage: _propTypes["default"].number.isRequired,
  currSizePerPage: _propTypes["default"].number.isRequired,
  onPageChange: _propTypes["default"].func.isRequired,
  onSizePerPageChange: _propTypes["default"].func.isRequired,
  disablePageTitle: _propTypes["default"].bool,
  pageStartIndex: _propTypes["default"].number,
  paginationSize: _propTypes["default"].number,
  showTotal: _propTypes["default"].bool,
  pageListRenderer: _propTypes["default"].func,
  pageButtonRenderer: _propTypes["default"].func,
  sizePerPageRenderer: _propTypes["default"].func,
  paginationTotalRenderer: _propTypes["default"].func,
  sizePerPageOptionRenderer: _propTypes["default"].func,
  firstPageText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  prePageText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  nextPageText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  lastPageText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  nextPageTitle: _propTypes["default"].string,
  prePageTitle: _propTypes["default"].string,
  firstPageTitle: _propTypes["default"].string,
  lastPageTitle: _propTypes["default"].string,
  withFirstAndLast: _propTypes["default"].bool,
  alwaysShowAllBtns: _propTypes["default"].bool,
  hideSizePerPage: _propTypes["default"].bool,
  hidePageListOnlyOnePage: _propTypes["default"].bool,
  bootstrap4: _propTypes["default"].bool
};
Pagination.defaultProps = {
  disablePageTitle: false,
  bootstrap4: false,
  pageStartIndex: _const["default"].PAGE_START_INDEX,
  paginationSize: _const["default"].PAGINATION_SIZE,
  withFirstAndLast: _const["default"].With_FIRST_AND_LAST,
  alwaysShowAllBtns: _const["default"].SHOW_ALL_PAGE_BTNS,
  showTotal: _const["default"].SHOW_TOTAL,
  pageListRenderer: null,
  pageButtonRenderer: null,
  sizePerPageRenderer: null,
  paginationTotalRenderer: _const["default"].PAGINATION_TOTAL,
  sizePerPageOptionRenderer: null,
  firstPageText: _const["default"].FIRST_PAGE_TEXT,
  prePageText: _const["default"].PRE_PAGE_TEXT,
  nextPageText: _const["default"].NEXT_PAGE_TEXT,
  lastPageText: _const["default"].LAST_PAGE_TEXT,
  sizePerPageList: _const["default"].SIZE_PER_PAGE_LIST,
  nextPageTitle: _const["default"].NEXT_PAGE_TITLE,
  prePageTitle: _const["default"].PRE_PAGE_TITLE,
  firstPageTitle: _const["default"].FIRST_PAGE_TITLE,
  lastPageTitle: _const["default"].LAST_PAGE_TITLE,
  hideSizePerPage: _const["default"].HIDE_SIZE_PER_PAGE,
  hidePageListOnlyOnePage: _const["default"].HIDE_PAGE_LIST_ONLY_ONE_PAGE
};
var _default = (0, _paginationHandler["default"])(Pagination);
exports["default"] = _default;