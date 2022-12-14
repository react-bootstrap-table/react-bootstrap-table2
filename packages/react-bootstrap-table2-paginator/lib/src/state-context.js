"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _events = _interopRequireDefault(require("events"));
var _const = _interopRequireDefault(require("./const"));
var _page = require("./page");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var StateContext = /*#__PURE__*/_react["default"].createContext();
var StateProvider = /*#__PURE__*/function (_React$Component) {
  _inherits(StateProvider, _React$Component);
  var _super = _createSuper(StateProvider);
  function StateProvider(props) {
    var _this;
    _classCallCheck(this, StateProvider);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "getPaginationProps", function () {
      var _this$props = _this.props,
        options = _this$props.pagination.options,
        bootstrap4 = _this$props.bootstrap4,
        tableId = _this$props.tableId;
      var _assertThisInitialize = _assertThisInitialized(_this),
        currPage = _assertThisInitialize.currPage,
        currSizePerPage = _assertThisInitialize.currSizePerPage,
        dataSize = _assertThisInitialize.dataSize;
      var withFirstAndLast = typeof options.withFirstAndLast === 'undefined' ? _const["default"].With_FIRST_AND_LAST : options.withFirstAndLast;
      var alwaysShowAllBtns = typeof options.alwaysShowAllBtns === 'undefined' ? _const["default"].SHOW_ALL_PAGE_BTNS : options.alwaysShowAllBtns;
      var hideSizePerPage = typeof options.hideSizePerPage === 'undefined' ? _const["default"].HIDE_SIZE_PER_PAGE : options.hideSizePerPage;
      var hidePageListOnlyOnePage = typeof options.hidePageListOnlyOnePage === 'undefined' ? _const["default"].HIDE_PAGE_LIST_ONLY_ONE_PAGE : options.hidePageListOnlyOnePage;
      var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const["default"].PAGE_START_INDEX : options.pageStartIndex;
      return _objectSpread(_objectSpread({}, options), {}, {
        bootstrap4: bootstrap4,
        tableId: tableId,
        page: currPage,
        sizePerPage: currSizePerPage,
        pageStartIndex: pageStartIndex,
        hidePageListOnlyOnePage: hidePageListOnlyOnePage,
        hideSizePerPage: hideSizePerPage,
        alwaysShowAllBtns: alwaysShowAllBtns,
        withFirstAndLast: withFirstAndLast,
        dataSize: dataSize,
        sizePerPageList: options.sizePerPageList || _const["default"].SIZE_PER_PAGE_LIST,
        paginationSize: options.paginationSize || _const["default"].PAGINATION_SIZE,
        showTotal: options.showTotal,
        pageListRenderer: options.pageListRenderer,
        pageButtonRenderer: options.pageButtonRenderer,
        sizePerPageRenderer: options.sizePerPageRenderer,
        paginationTotalRenderer: options.paginationTotalRenderer,
        sizePerPageOptionRenderer: options.sizePerPageOptionRenderer,
        firstPageText: options.firstPageText || _const["default"].FIRST_PAGE_TEXT,
        prePageText: options.prePageText || _const["default"].PRE_PAGE_TEXT,
        nextPageText: options.nextPageText || _const["default"].NEXT_PAGE_TEXT,
        lastPageText: options.lastPageText || _const["default"].LAST_PAGE_TEXT,
        prePageTitle: options.prePageTitle || _const["default"].PRE_PAGE_TITLE,
        nextPageTitle: options.nextPageTitle || _const["default"].NEXT_PAGE_TITLE,
        firstPageTitle: options.firstPageTitle || _const["default"].FIRST_PAGE_TITLE,
        lastPageTitle: options.lastPageTitle || _const["default"].LAST_PAGE_TITLE,
        onPageChange: _this.handleChangePage,
        onSizePerPageChange: _this.handleChangeSizePerPage
      });
    });
    _defineProperty(_assertThisInitialized(_this), "setPaginationRemoteEmitter", function (remoteEmitter) {
      _this.remoteEmitter = remoteEmitter;
    });
    _defineProperty(_assertThisInitialized(_this), "getPaginationRemoteEmitter", function () {
      return _this.remoteEmitter || _this.props.remoteEmitter;
    });
    _defineProperty(_assertThisInitialized(_this), "isRemotePagination", function () {
      var e = {};
      _this.remoteEmitter.emit('isRemotePagination', e);
      return e.result;
    });
    _this.handleChangePage = _this.handleChangePage.bind(_assertThisInitialized(_this));
    _this.handleDataSizeChange = _this.handleDataSizeChange.bind(_assertThisInitialized(_this));
    _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_assertThisInitialized(_this));
    var _currPage;
    var _currSizePerPage;
    var _options = props.pagination.options;
    var sizePerPageList = _options.sizePerPageList || _const["default"].SIZE_PER_PAGE_LIST;

    // initialize current page
    if (typeof _options.page !== 'undefined') {
      _currPage = _options.page;
    } else if (typeof _options.pageStartIndex !== 'undefined') {
      _currPage = _options.pageStartIndex;
    } else {
      _currPage = _const["default"].PAGE_START_INDEX;
    }

    // initialize current sizePerPage
    if (typeof _options.sizePerPage !== 'undefined') {
      _currSizePerPage = _options.sizePerPage;
    } else if (_typeof(sizePerPageList[0]) === 'object') {
      _currSizePerPage = sizePerPageList[0].value;
    } else {
      _currSizePerPage = sizePerPageList[0];
    }
    _this.currPage = _currPage;
    _this.dataSize = _options.totalSize;
    _this.currSizePerPage = _currSizePerPage;
    _this.dataChangeListener = new _events["default"]();
    _this.dataChangeListener.on('filterChanged', _this.handleDataSizeChange);
    return _this;
  }
  _createClass(StateProvider, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var custom = nextProps.pagination.options.custom;

      // user should align the page when the page is not fit to the data size when remote enable
      if (this.isRemotePagination() || custom) {
        if (typeof nextProps.pagination.options.page !== 'undefined') {
          this.currPage = nextProps.pagination.options.page;
        }
        if (typeof nextProps.pagination.options.sizePerPage !== 'undefined') {
          this.currSizePerPage = nextProps.pagination.options.sizePerPage;
        }
        if (typeof nextProps.pagination.options.totalSize !== 'undefined') {
          this.dataSize = nextProps.pagination.options.totalSize;
        }
      }
    }
  }, {
    key: "handleDataSizeChange",
    value: function handleDataSizeChange(newDataSize) {
      var options = this.props.pagination.options;
      var pageStartIndex = typeof options.pageStartIndex === 'undefined' ? _const["default"].PAGE_START_INDEX : options.pageStartIndex;
      this.currPage = (0, _page.alignPage)(newDataSize, this.dataSize, this.currPage, this.currSizePerPage, pageStartIndex);
      this.dataSize = newDataSize;
      this.forceUpdate();
    }
  }, {
    key: "handleChangePage",
    value: function handleChangePage(currPage) {
      var currSizePerPage = this.currSizePerPage;
      var options = this.props.pagination.options;
      if (options.onPageChange) {
        options.onPageChange(currPage, currSizePerPage);
      }
      this.currPage = currPage;
      if (this.isRemotePagination()) {
        this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
        return;
      }
      this.forceUpdate();
    }
  }, {
    key: "handleChangeSizePerPage",
    value: function handleChangeSizePerPage(currSizePerPage, currPage) {
      var options = this.props.pagination.options;
      if (options.onSizePerPageChange) {
        options.onSizePerPageChange(currSizePerPage, currPage);
      }
      this.currPage = currPage;
      this.currSizePerPage = currSizePerPage;
      if (this.isRemotePagination()) {
        this.getPaginationRemoteEmitter().emit('paginationChange', currPage, currSizePerPage);
        return;
      }
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var paginationProps = this.getPaginationProps();
      var pagination = _objectSpread(_objectSpread({}, this.props.pagination), {}, {
        options: paginationProps
      });
      return /*#__PURE__*/_react["default"].createElement(StateContext.Provider, {
        value: {
          paginationProps: paginationProps,
          paginationTableProps: {
            pagination: pagination,
            setPaginationRemoteEmitter: this.setPaginationRemoteEmitter,
            dataChangeListener: this.dataChangeListener
          }
        }
      }, this.props.children);
    }
  }]);
  return StateProvider;
}(_react["default"].Component);
var _default = function _default() {
  return {
    Provider: StateProvider,
    Consumer: StateContext.Consumer
  };
};
exports["default"] = _default;